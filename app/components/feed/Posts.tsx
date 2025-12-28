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

interface PostCardProps {
  userImg: string;
  postImg: string;
  content: string;
  name: string;
  heading: string;
  id: string;
  userId: string;
  createdAt: string | Date;
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
    userId: string;
    name: string;
    roll_number: string;
    email: string;
    image: string | null;
    role: string | null;
  };
}

const formatTimestamp = (date: string | Date) => {
  try {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return "";
  }
};

//! Premium Post Card Component with smooth animations and modern design
const PostCard: React.FC<PostCardProps> = ({
  userImg,
  postImg,
  content,
  name,
  id,
  userId,
  heading,
  createdAt,
}) => {
  const [postContentOpen, setPostContentOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRead = () => {
    setPostContentOpen(!postContentOpen);
  };

  const handleCopy = () => {
    const plainText = content.replace(/<[^>]*>/g, "");
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    toast.success("Content copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: heading,
          text: `Check out this post: ${heading} by ${name}`,
          url: `${window.location.origin}/post/${id}`,
        })
        .catch(() => {
          toast.error("Sharing failed");
        });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
      toast.success("Link copied!");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-purple-100/20 border border-gray-100/50 my-10 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fadeIn group/card">
      {/* Header */}
      <div className="flex items-center p-6 bg-gradient-to-r from-white to-purple-50/30">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-tr rounded-full blur opacity-20 group-hover/card:opacity-40 transition duration-500"></div>
          <Image
            src={userImg}
            alt={name}
            width={56}
            height={56}
            className="relative rounded-full w-14 h-14 object-cover ring-4 ring-white shadow-md"
          />
        </div>

        <div className="flex-1 ml-4">
          <h3 className="font-extrabold text-xl text-gray-900 tracking-tight leading-tight">
            {heading}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-xs text-gray-400 font-medium">
              {formatTimestamp(createdAt)}
            </span>
          </div>
        </div>

        <div
          onClick={handleRead}
          className={`relative cursor-pointer overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold  ${
            postContentOpen
              ? "bg-gray-100 text-gray-600"
              : "text-gray-900 hover:bg-gray-100 hover:text-gray-600  hover:shadow-purple-200"
          }`}
        >
          {postContentOpen ? <>Close</> : <>Read</>}
        </div>
      </div>

      {/* Content Area - Toggle between Image and Text */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          postContentOpen ? "max-h-[1500px]" : "max-h-[600px]"
        }`}
      >
        {postContentOpen ? (
          <div className="min-h-[463px] max-h-[463px] overflow-y-auto px-4 text-center font-serif text-xl sm:text-2xl leading-[2] text-gray-800 italic whitespace-pre-line drop-shadow-sm">
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className="text-sm flex justify-center items-center gap-2 font-semibold">
              Written By: <ReadUsersPostDashBoard id={userId} name={name} />
            </div>
          </div>
        ) : (
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/8] cursor-pointer overflow-hidden group/img"
            onClick={handleRead}
          >
            <Image
              src={postImg}
              alt={heading}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/card:opacity-60 transition-opacity"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
              <p className="text-lg font-serif italic line-clamp-2 drop-shadow-lg opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100">
                {content?.replace(/<[^>]*>/g, "").substring(0, 150)}...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-6 bg-white border-t border-gray-50 flex items-center justify-between">
        {!postContentOpen && (
          <div className="text-sm flex justify-center items-center gap-2 font-semibold">
            Written By: <ReadUsersPostDashBoard id={userId} name={name} />
          </div>
        )}
        <div className="flex justify-end flex-1 items-center gap-4">
          {postContentOpen && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-gray-100 text-gray-500  hover:border-purple-100 transition-all text-sm font-bold shadow-sm"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ClipboardDocumentIcon className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Keep Poem"}
            </button>
          )}
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl transition-all duration-300 group ${
              liked
                ? "bg-red-50 text-red-600"
                : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            {liked ? (
              <HeartIconSolid className="w-6 h-6 animate-[heartbeat_0.6s_ease-in-out]" />
            ) : (
              <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            )}
          </button>
          <div className="flex items-center">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition-all"
              aria-label="Share post"
            >
              <ShareIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
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
        <PostCard
          key={post.post_id}
          id={post.post_id}
          userId={post.user.userId}
          userImg={post.user.image || "/default-avatar.png"}
          postImg={post.image}
          content={post.content}
          name={post.user.name}
          heading={post.heading}
          createdAt={post.create_at}
        />
      ))}
    </div>
  );
};

export default Posts;
