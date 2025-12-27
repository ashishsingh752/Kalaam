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
  create_at: string | Date;
}

interface ApiPostType {
  post_id: string;
  content: string;
  heading: string;
  image: string;
  create_at: string | Date;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  roll_number: string;
  image: string;
  role: string;
  posts: Array<PostType>;
}

// ! Passing the props for the specific user posts - Enhanced UI/UX
export default function ReadUsersPost() {
  const [userPosts, setUserPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userRollNumber, setUserRollNumber] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
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
          setUserName(userPostsResponse.name || "");
          setUserRollNumber(userPostsResponse.roll_number || "");
          setUserRole(userPostsResponse.role || "");
        }
        if (userPostsResponse && userPostsResponse.Post) {
          const transformedPosts = userPostsResponse.Post.map(
            (post: ApiPostType) => ({
              key: post.post_id,
              id: post.post_id,
              content: post.content,
              heading: post.heading,
              image: post.image,
              create_at: post.create_at,
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
      <div className="min-h-screen -mt-24 bg-[#fcfdff] flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl mb-12 animate-fadeIn">
          <div className="flex justify-start mb-8">
            <BackToHome />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative group max-w-md w-full">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

            <div className="relative bg-white/70 backdrop-blur-2xl p-12 text-center rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] animate-fadeIn">
              <div className="relative mb-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-50 to-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner relative z-10">
                  <DocumentTextIcon className="w-12 h-12 text-indigo-400/80" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-1/4 w-4 h-4 bg-purple-100 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-1/4 w-3 h-3 bg-indigo-100 rounded-full animate-bounce delay-300"></div>
              </div>

              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Silent Sanctuary
              </h2>

              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-serif italic">
                &ldquo;Words are the small seeds from which great empires are
                built.&rdquo; <br />
                {userName || "This user"} hasn&apos;t planted any seeds yet.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full py-5 bg-slate-900 text-white rounded-3xl font-bold text-lg hover:bg-black hover:shadow-2xl hover:shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <HomeIcon className="w-6 h-6 text-indigo-400" />
                  Explore Others
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl mb-12 animate-fadeIn">
        <div className="flex justify-start mb-8">
          <BackToHome />
        </div>

        <div className="relative group">
          <div className="relative bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-10">
              <div className="relative">
                <div className="p-1.5 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 shadow-inner">
                  <Image
                    src={
                      userImage ||
                      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    }
                    width={160}
                    height={160}
                    alt={userName}
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shadow-2xl border-4 border-white"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                  {userName}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                      <DocumentTextIcon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900 leading-none">
                        {userPosts.length}
                      </p>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
                        Publications
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block h-10 w-px bg-slate-200"></div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-500">
                      {userRollNumber}
                    </p>
                  </div>

                  <div className="hidden md:block h-10 w-px bg-slate-200"></div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-500">
                      {userRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-4">
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
              createdAt={post.create_at}
            />
          </div>
        ))}
      </div>

      <div className="mt-20 mb-12 text-center">
        <div className="inline-flex items-center gap-3 text-gray-300">
          <div className="h-px w-8 bg-gray-200"></div>
          <p className="text-sm font-medium italic font-serif">
            You&apos;ve reached the beginning of the journey
          </p>
          <div className="h-px w-8 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
