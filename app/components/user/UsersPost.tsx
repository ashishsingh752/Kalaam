"use client";
import React, { useState, useEffect } from "react";
import { getUserPosts } from "@/lib/serverMethods";
import { DeletePostButton } from "../buttons/Button";
import { useRouter } from "next/navigation";

interface PostType {
  id: number;
  post_id: string;
  content: string;
  heading: string;
  image: string;
}

function truncateText(text: string, wordLimit: number): string {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}

// ! This is the component to show information of all posts in the profile section. Status: 200
const UsersPost = () => {
  const [userPost, setUserPost] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getUserPosts();
        const transformedPosts = posts.map((post) => ({
          key: post.id,
          id: post.id,
          post_id: post.post_id,
          content: post.content,
          heading: post.heading,
          image: post.image,
        }));
        setUserPost(transformedPosts);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (userPost.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-300 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p className="text-gray-500 font-medium">
          You haven&apos;t posted anything yet.
        </p>
        <button
          onClick={() => router.push("/newpost")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          Create New Post
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {userPost.map((post: PostType) => (
        <div
          key={post.post_id}
          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
        >
          <div className="p-6 flex-grow">
            <h4
              className="text-lg font-bold text-gray-900 mb-2 truncate"
              title={post.heading}
            >
              {post.heading}
            </h4>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {truncateText(post.content, 30)}
            </p>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100 mt-auto">
            <button
              onClick={() => router.push(`/updatepost?id=${post.post_id}`)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <div className="transform scale-90 origin-right">
              <DeletePostButton id={post.post_id} heading={post.heading} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersPostWrapper = () => {
  return <UsersPost />;
};

export default UsersPostWrapper;
