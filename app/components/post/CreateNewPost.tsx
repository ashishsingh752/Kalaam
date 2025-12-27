"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import PrevPost from "./PrevPost";
import axios from "axios";
import {
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

// ! Create new post component - Enhanced with premium UI/UX

export default function CreateNewPost() {
  const imgeRef = useRef<HTMLInputElement | null>(null);
  const [preView, setPreView] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [readContent, setReadContent] = useState(false);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const maxTitleLength = 100;
  const maxContentLength = 5000;

  // Cleanup the object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (preView) {
        URL.revokeObjectURL(preView);
      }
    };
  }, [preView]);

  // function to select the image for the user device
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(selectedFile);
      const previewImageUrl = URL.createObjectURL(selectedFile);
      setPreView(previewImageUrl);
      toast.success("Image selected successfully!");
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      const previewImageUrl = URL.createObjectURL(file);
      setPreView(previewImageUrl);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const handlePostTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxTitleLength) {
      setPostTitle(event.target.value);
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxContentLength) {
      setContent(event.target.value);
    }
  };

  const handleImageUpload = async () => {
    if (!image || !postTitle.trim() || !content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("heading", postTitle);
    formData.append("image", image);

    const toastId = toast.loading("Creating your post...");

    try {
      const response = await axios.post("/api/post", formData);
      const responseData = response.data;

      if (responseData.status === 200) {
        toast.success("Post created successfully!", { id: toastId });
        router.push("/");
        router.refresh();
      } else {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    } catch (error) {
      console.error("error uploading image: ", error);
      toast.error("Failed to create post. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-10 bg-gradient-page flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-4xl mt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Create Your Post
          </h1>
          <p className="text-gray-600">Share your thoughts with the world ✨</p>
        </div>

        {/* Main Form Card */}
        <div className="card-elevated p-6 md:p-8 animate-fadeIn">
          {/* Title Input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Post Title
            </label>
            <textarea
              name="text"
              id="title"
              placeholder="Enter an engaging title..."
              value={postTitle}
              onChange={handlePostTitle}
              className="textarea-premium h-20 font-semibold text-lg"
              maxLength={maxTitleLength}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Make it catchy and descriptive
              </p>
              <p
                className={`text-xs font-medium ${
                  postTitle.length >= maxTitleLength
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {postTitle.length}/{maxTitleLength}
              </p>
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              name="text"
              id="content"
              placeholder="Write your amazing content here..."
              value={content}
              onChange={handleContentChange}
              className="textarea-premium h-80"
              maxLength={maxContentLength}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">Express yourself freely</p>
              <p
                className={`text-xs font-medium ${
                  content.length >= maxContentLength
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {content.length}/{maxContentLength}
              </p>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>

            {/* Drag and Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 bg-gray-50"
              } ${image ? "hidden" : "block"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <PhotoIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                  Drag and drop your image here
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <button
                  type="button"
                  onClick={() => imgeRef.current?.click()}
                  className="btn-premium"
                >
                  Browse Files
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                id="images"
                accept="image/*"
                onChange={handleImageChange}
                ref={imgeRef}
                aria-label="Upload cover image"
              />
            </div>

            {/* Image Preview */}
            {image && preView && (
              <div className="relative rounded-xl overflow-hidden group animate-fadeIn">
                <img
                  src={preView}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setImage(null);
                      setPreView("");
                      if (imgeRef.current) imgeRef.current.value = "";
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-white text-red-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={!image || !postTitle || !content}
              className="btn-premium flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {showPreview ? (
                <>
                  <EyeSlashIcon className="w-5 h-5" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <EyeIcon className="w-5 h-5" />
                  <span>Preview</span>
                </>
              )}
            </button>
            <button
              disabled={!image || !postTitle || !content || loading}
              onClick={handleImageUpload}
              className="btn-premium-pink flex items-center justify-center gap-2 w-full sm:w-auto ripple"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>Publish Post</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && image && postTitle && content && (
          <div className="mt-8 animate-fadeIn">
            <h2 className="text-2xl font-bold gradient-text mb-4 text-center">
              Preview
            </h2>
            <PrevPost
              title={postTitle}
              image={preView}
              readContent={readContent}
              creation={content}
              setReadContent={setReadContent}
            />
          </div>
        )}
      </div>
    </div>
  );
}
