"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import PrevPost from "./PrevPost";
import axios from "axios";
import { getUserPostsToUpdate } from "@/lib/serverMethods";

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
}

export default function UpdatePost() {
  const imgeRef = useRef<HTMLInputElement | null>(null);
  const [preView, setPreView] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [readContent, setReadContent] = useState(false);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [userPost, setUserPost] = useState<Array<PostType>>([]);

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  // console.log("postId is: ", postId);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (postId) {
        try {
          const posts = await getUserPostsToUpdate({ id: Number(postId) });
          if (posts) {
            const transformedPost: PostType = {
              id: posts.id,
              content: posts.content,
              heading: posts.heading,
              image: posts.image,
            };
            setUserPost([transformedPost]);
          }
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
          setError("Failed to load posts");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [postId]);

  useEffect(() => {
    return () => {
      if (preView) {
        URL.revokeObjectURL(preView);
      }
    };
  }, [preView]);

  // Function to select the image from the user's device
  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      const previewImageUrl = URL.createObjectURL(selectedFile);
      setPreView(previewImageUrl);
    }
  };

  const handlePostTitle = (event: any) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  const handlePostUpdate = async () => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("heading", postTitle);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (postId) {
        const response = await axios.post(`/api/post/${postId}`, formData);
        setLoading(false);
        const responseData = response.data;
        if (responseData.status === 200) {
          router.push("/");
          router.refresh();
        } else {
          setError("Something went wrong. Please try again later.");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("error uploading image: ", error);
      setError("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="min-h-screen pb-5 md:h-full bg-gray-200 flex flex-col justify-center items-center">
      {userPost.map((post: PostType) => (
        <div key={post.id}>
          <div className="bg-gray-300 sm:mt-5 w-full p-5 md:w-[calc(100vw-25rem)] justify-center items-center">
            {/* title for the content */}
            <textarea
              name="text"
              id="title"
              placeholder="Enter Title"
              onChange={handlePostTitle}
              defaultValue={post.heading}
              className="w-full h-20 focus:ring-0 font-semibold text-lg resize-y outline-none scrollbar p-6"
            ></textarea>
            {/* content */}
            <textarea
              name="text"
              id="content"
              placeholder="Enter Your creation"
              onChange={handleContentChange}
              defaultValue={post.content}
              className="w-full h-80 focus:ring-0 outline-none resize-y p-6"
            ></textarea>
            {/* image selection */}
            <div className="mt-3 flex flex-wrap md:flex-nowrap gap-2 justify-between items-center">
              <div>
                <input
                  type="file"
                  className="w-56 cursor-pointer"
                  id="images"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imgeRef}
                />
              </div>
              {/* button to preview and post */}
              <div className="flex md:w-auto w-full gap-2 justify-between">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  disabled={!image}
                >
                  {!showPreview ? "Preview" : "Hide Preview"}
                </button>
                <button
                  disabled={!image || !postTitle || !content || loading}
                  onClick={handlePostUpdate}
                  className="bg-gray-700 outline-none text-white px-4 py-2 rounded-md font-medium hover:bg-gray-950 transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
          {/* preview post */}
          {showPreview && image && (
            <div className="bg-gray-300 w-full pt-5 md:w-[calc(100vw-25rem)] justify-center items-center h-auto">
              <PrevPost
                title={postTitle}
                image={preView}
                readContent={readContent}
                creation={content}
                setReadContent={setReadContent}
              />
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ))}
    </div>
  );
}
