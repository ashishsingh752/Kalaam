"use client";
import Image from "next/image";
import {
  HeartIcon,
  BookOpenIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getPost } from "@/lib/serverMethods";
import { FormSkeleton } from "../post/PostSkeleton";

interface PostCardProps {
  userImg: string;
  postImg: string;
  content: string;
  name: string;
  heading: string;
  id: string;
}

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
    name: string;
    roll_number: string;
    email: string;
    image: string | null;
    role: string | null;
  };
}

//! Premium Post Card Component with smooth animations and modern design
const PostCard: React.FC<PostCardProps> = ({
  userImg,
  postImg,
  content,
  name,
  id,
  heading,
}) => {
  const [postContentOpen, setPostContentOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const handleRead = () => {
    setPostContentOpen(!postContentOpen);
  };

  return (
    <div className="card-elevated hover-lift my-7 animate-fadeIn">
      {/* Post Header */}
      <div className="flex items-center p-5 border-b border-gray-100">
        <div className="relative">
          <Image
            src={userImg}
            alt={name}
            width={48}
            height={48}
            className="rounded-full w-12 h-12 object-cover ring-2 ring-purple-100"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 ml-3">
          <h3 className="font-bold text-lg gradient-text line-clamp-1">
            {heading}
          </h3>
          <p className="text-sm text-gray-500">by {name}</p>
        </div>

        <button
          onClick={handleRead}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-purple text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={postContentOpen ? "Close content" : "Read content"}
        >
          {postContentOpen ? (
            <>
              <XMarkIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Close</span>
            </>
          ) : (
            <>
              <BookOpenIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Read</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area - Toggle between Image and Text */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          postContentOpen ? "max-h-[500px]" : "max-h-96"
        }`}
      >
        {postContentOpen ? (
          <div className="p-6 custom-scrollbar overflow-auto max-h-[450px] bg-gradient-to-br from-slate-50 to-purple-50 animate-fadeIn">
            {/* Content Text */}
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Thank You Message */}
            <div className="mt-6 pt-4 border-t border-purple-100">
              <p className="text-center text-sm text-gray-500 italic">
                ✨ Thank you for reading this post! ✨
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-96 overflow-hidden group">
            <Image
              src={postImg}
              alt={heading}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white w-full">
                <p className="text-sm truncate-2-lines">
                  {content?.substring(0, 150) || "No content available"}...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Author and Interactions */}
      <div className="px-5 py-4 border-t border-gray-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Author:</span>{" "}
            <span className="italic text-purple-600">{name}</span>
          </p>

          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 group"
            aria-label={liked ? "Unlike post" : "Like post"}
          >
            {liked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500 animate-pulse-subtle" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            )}
            <span className="text-sm font-medium text-gray-600">
              {liked ? "Liked" : "Like"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

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
        setPosts(fetchedPosts || []);
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
      <div className="space-y-6">
        <FormSkeleton />
        <FormSkeleton />
        <FormSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-lg mb-2">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-premium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold gradient-text mb-2">
            No Posts Yet
          </h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your thoughts with the community!
          </p>
        </div>
      </div>
    );
  }

  // Posts display
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          userImg={post.user.image || "/default-avatar.png"}
          postImg={post.image}
          content={post.content}
          name={post.user.name}
          heading={post.heading}
        />
      ))}
    </div>
  );
};

export default Posts;
