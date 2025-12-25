"use client";
import { getUserPostsToRead } from "@/lib/serverMethods";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Post from "../feed/Post";
import { BackToHome } from "../buttons/Button";

import { DocumentTextIcon, HomeIcon } from "@heroicons/react/24/outline";
import PostSkeleton from "./PostSkeleton";

interface PostType {
  id: string;
  content: string;
  heading: string;
  image: string;
}

interface ApiPostType {
  post_id: string;
  content: string;
  heading: string;
  image: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  roll_number: string;
  image: string;
  posts: Array<PostType>;
}

// ! Passing the props for the specific user posts - Enhanced UI/UX
export default function ReadUsersPost() {
  const [userPosts, setUserPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPostsResponse = await getUserPostsToRead({
          id: userId as string,
        });
        setUserImage(userPostsResponse.image);
        if (userPostsResponse && userPostsResponse.name) {
          setUserName(userPostsResponse.name);
        }
        if (userPostsResponse && userPostsResponse.Post) {
          const transformedPosts = userPostsResponse.Post.map(
            (post: ApiPostType) => ({
              key: post.post_id,
              id: post.post_id,
              content: post.content,
              heading: post.heading,
              image: post.image,
            })
          );
          setUserPosts(transformedPosts);
        }
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-page flex flex-col items-center px-4 py-8">
        {/* Loading Header */}
        <div className="w-full max-w-4xl mb-8 animate-fadeIn">
          <div className="card-elevated p-6">
            <div className="flex items-center gap-4">
              <div className="skeleton w-20 h-20 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton skeleton-title w-48 mb-2"></div>
                <div className="skeleton skeleton-text w-32"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Posts */}
        <div className="w-full max-w-4xl">
          <PostSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-page flex justify-center items-center px-4">
        <div className="card-elevated p-8 text-center max-w-md animate-fadeIn">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <BackToHome />
        </div>
      </div>
    );
  }

  if (userPosts.length === 0 || !userPosts) {
    return (
      <div className="min-h-screen bg-gradient-page flex justify-center items-center px-4">
        <div className="card-elevated p-12 text-center max-w-md animate-fadeIn">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <DocumentTextIcon className="w-10 h-10 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-3">
            No Posts Yet
          </h2>
          <p className="text-gray-600 mb-8">
            {userName || "This user"} hasn&apos;t shared any posts yet. Check
            back later!
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="btn-premium inline-flex items-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-page flex flex-col items-center px-4 py-8">
      {/* User Header */}
      <div className="w-full max-w-4xl mb-8 animate-fadeIn">
        <div className="card-elevated overflow-hidden">
          <div className="h-32 bg-gradient-purple"></div>
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex items-end gap-4 mb-4">
              <div className="relative">
                <Image
                  src={
                    userImage ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  width={120}
                  height={120}
                  alt={userName}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {userName}
                </h1>
                <p className="text-gray-500">
                  {userPosts.length} {userPosts.length === 1 ? "Post" : "Posts"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-4xl space-y-6">
        {userPosts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Post
              id={post.id.toString()}
              name={userName}
              userImg={
                userImage ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              postImg={post.image}
              content={post.content}
              heading={post.heading}
            />
          </div>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="mt-12 mb-8">
        <button
          onClick={() => (window.location.href = "/")}
          className="btn-premium inline-flex items-center gap-2"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
