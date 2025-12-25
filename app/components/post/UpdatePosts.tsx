"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import PrevPost from "./PrevPost";
import axios from "axios";
import { getUserPostsToUpdate } from "@/lib/serverMethods";
import {
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { FormSkeleton } from "./PostSkeleton";

interface PostType {
  id: string;
  post_id: string;
  content: string;
  heading: string;
  image: string;
}

//! Update post component - Enhanced with premium UI/UX
export default function UpdatePost() {
  const imgeRef = useRef<HTMLInputElement | null>(null);
  const [preView, setPreView] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [readContent, setReadContent] = useState(false);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();
  const [userPost, setUserPost] = useState<Array<PostType>>([]);
  const [originalPost, setOriginalPost] = useState<PostType | null>(null);

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const maxTitleLength = 100;
  const maxContentLength = 5000;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (postId) {
        try {
          const posts = await getUserPostsToUpdate({ id: postId });
          if (posts) {
            const transformedPost: PostType = {
              id: posts.post_id,
              post_id: posts.post_id,
              content: posts.content,
              heading: posts.heading,
              image: posts.image,
            };
            setUserPost([transformedPost]);
            setOriginalPost(transformedPost);
            setPostTitle(posts.heading);
            setContent(posts.content);
            setPreView(posts.image);
          }
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
          toast.error("Failed to load post");
        } finally {
          setFetchLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [postId]);

  useEffect(() => {
    return () => {
      if (preView && image) {
        URL.revokeObjectURL(preView);
      }
    };
  }, [preView, image]);

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
      toast.success("Image updated successfully!");
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
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

  const handlePostTitle = (event: any) => {
    if (event.target.value.length <= maxTitleLength) {
      setPostTitle(event.target.value);
    }
  };

  const handleContentChange = (event: any) => {
    if (event.target.value.length <= maxContentLength) {
      setContent(event.target.value);
    }
  };

  const handlePostUpdate = async () => {
    if (!postTitle.trim() || !content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("heading", postTitle);
    if (image) {
      formData.append("image", image);
    }

    const toastId = toast.loading("Updating your post...");

    try {
      if (postId) {
        const response = await axios.post(`/api/post/${postId}`, formData);
        const responseData = response.data;

        if (responseData.status === 200) {
          toast.success("Post updated successfully!", { id: toastId });
          router.push("/");
          router.refresh();
        } else {
          toast.error("Something went wrong. Please try again.", {
            id: toastId,
          });
        }
      }
    } catch (error) {
      console.error("error updating post: ", error);
      toast.error("Failed to update post. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen pb-10 bg-gradient-page flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl mt-8">
          <FormSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 bg-gradient-page flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-4xl mt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Update Your Post
          </h1>
          <p className="text-gray-600">Make your post even better ✨</p>
        </div>

        {userPost.map((post: PostType) => (
          <div key={post.id}>
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
                  <p className="text-xs text-gray-500">
                    Express yourself freely
                  </p>
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
                  Cover Image {!image && "(Update optional)"}
                </label>

                {/* Current Image Preview */}
                {preView && (
                  <div className="relative rounded-xl overflow-hidden group mb-4 animate-fadeIn">
                    <img
                      src={preView}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => imgeRef.current?.click()}
                        className="opacity-0 group-hover:opacity-100 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-purple-600 hover:text-white flex items-center gap-2"
                      >
                        <ArrowPathIcon className="w-5 h-5" />
                        Change Image
                      </button>
                      {image && (
                        <button
                          onClick={() => {
                            setImage(null);
                            if (originalPost) {
                              setPreView(originalPost.image);
                            }
                            if (imgeRef.current) imgeRef.current.value = "";
                          }}
                          className="opacity-0 group-hover:opacity-100 bg-white text-red-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-red-500 hover:text-white"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Drag and Drop Zone (only show if no image) */}
                {!preView && (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                      dragActive
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
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
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  id="images"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imgeRef}
                  aria-label="Upload post cover image"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={!postTitle || !content}
                  className="btn-premium flex items-center gap-2"
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
                  disabled={!postTitle || !content || loading}
                  onClick={handlePostUpdate}
                  className="btn-premium-pink flex items-center gap-2 ripple"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <ArrowPathIcon className="w-5 h-5" />
                      <span>Update Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            {showPreview && postTitle && content && (
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
        ))}
      </div>
    </div>
  );
}
