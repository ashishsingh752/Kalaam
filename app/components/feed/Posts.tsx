"use client";
import Image from "next/image";
import {
  HeartIcon,
  BookOpenIcon,
  XMarkIcon,
  ShareIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getPost } from "@/lib/serverMethods";
import { FormSkeleton } from "../post/PostSkeleton";
import { toast } from "react-hot-toast";
import { ReadUsersPostDashBoard } from "../buttons/Button";
import Post from "./Post";

interface PostType {
  id: number;
  user_id: number;
  post_id: string;
  content: string;
  image: string;
  heading: string;
  create_at: string | Date;
  update_at: string | Date;
  user: {
    id: number;
    userId: string;
    name: string;
    roll_number: string;
    email: string;
    image: string | null;
    role: string | null;
  };
  _count?: {
    likes: number;
  };
  liked?: boolean;
}

//! Posts Container Component - Fetches and displays all posts
const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPost();
        setPosts((fetchedPosts as any) || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-12 mt-12 px-4 sm:px-0">
        <FormSkeleton />
        <FormSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-red-100/50 border border-red-50">
          <div className="text-5xl mb-6">🏜️</div>
          <p className="text-red-600 font-black text-2xl mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md mx-auto px-8 py-16 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="text-8-xl mb-8 animate-bounce">🎨</div>
          <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
            Empty Canvas
          </h3>
          <p className="text-gray-500 text-xl mb-10 leading-relaxed font-serif italic">
            &ldquo;Every artist was first an amateur.&rdquo; <br />
            Be the first to share your magic.
          </p>
          <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl font-black text-lg hover:shadow-2xl hover:shadow-purple-200 transition-all active:scale-95">
            Share Your First Poem
          </button>
        </div>
      </div>
    );
  }

  // Posts display
  return (
    <div className="pb-32 space-y-4">
      {posts.map((post) => (
        <Post
          key={post.post_id}
          id={post.post_id}
          userId={post.user.userId}
          userImg={post.user.image || "/default-avatar.png"}
          postImg={post.image}
          content={post.content}
          name={post.user.name}
          heading={post.heading}
          createdAt={post.create_at}
          initialLikeCount={post._count?.likes || 0}
          initialLiked={post.liked}
        />
      ))}
    </div>
  );
};

export default Posts;
