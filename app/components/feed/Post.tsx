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
import { useState } from "react";
import { toast } from "react-hot-toast";

interface PostsProps {
  userImg: string;
  postImg: string;
  content: string;
  name: string;
  heading: string;
  id: string;
  createdAt?: string | Date;
}

const formatTimestamp = (date?: string | Date) => {
  if (!date) return "";
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

const Post: React.FC<PostsProps> = ({
  userImg,
  postImg,
  content,
  name,
  id,
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
    const shareUrl = `${window.location.origin}/post/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: heading,
          text: `Check out this post: ${heading} by ${name}`,
          url: shareUrl,
        })
        .catch(() => {
          toast.error("Sharing failed");
        });
    } else {
      navigator.clipboard.writeText(shareUrl);
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

        <button
          onClick={handleRead}
          className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all duration-300 ${
            postContentOpen
              ? "bg-gray-100 text-gray-600"
              : "bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-purple-200"
          }`}
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
          postContentOpen ? "max-h-[1500px]" : "max-h-[600px]"
        }`}
      >
        {postContentOpen ? (
          <div className="p-8 sm:p-12 bg-[#fcfdff] relative animate-fadeIn">
            {/* Subtle patterns/decorations */}
            <div className="absolute top-10 left-10 text-6xl text-purple-100 font-serif opacity-30 select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-10 right-10 text-6xl text-purple-100 font-serif opacity-30 select-none rotate-180">
              &ldquo;
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent rounded-full"></div>
              </div>

              <div className="text-center font-serif text-xl sm:text-2xl leading-[2] text-gray-800 italic whitespace-pre-line drop-shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              <div className="mt-12 flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-300">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">
                  Finis
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-purple-600 hover:border-purple-100 transition-all text-sm font-bold shadow-sm"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Keep Poem"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-100 transition-all text-sm font-bold shadow-sm"
                  >
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
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
        <span className="text-sm font-semibold">
          Written by: <span className="font-bold text-purple-600">{name}</span>
        </span>

        <div className="flex items-center gap-4">
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
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition-all"
            aria-label="Share post"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
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

export default Post;
