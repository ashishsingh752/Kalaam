"use client";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface PostsProps {
  userImg: string;
  postImg: string;
  content: string;
  name: string;
  heading: string;
  id: string;
}

interface PostType {
  id: number;
  roll_number: string;
  content: string;
  image?: string;
  name: string;
  heading: string;
}

//! This it to pass the props Post in feed . It will show the user post image and content and Poet info. Status: 200
const Post: React.FC<PostsProps> = ({
  userImg,
  postImg,
  content,
  name,
  id,
  heading,
}) => {
  const [postContentOpen, setPostContentOpen] = useState<boolean>(false);
  const [readContent, setReadContent] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleRead = () => {
    setPostContentOpen(!postContentOpen);
    setReadContent(postContentOpen ? "" : content);
  };

  return (
    <div className="bg-white my-6 rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-slate-200 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={userImg}
              alt={name}
              width={48}
              height={48}
              className="relative rounded-full w-10 h-10 object-cover ring-2 ring-slate-50 group-hover:ring-slate-200 transition-all duration-300"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">
              {heading}
            </h3>
            <p className="text-xs text-slate-500 font-medium">{name}</p>
          </div>
        </div>

        <button
          onClick={handleRead}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            postContentOpen
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          {postContentOpen ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span>Collapse</span>
            </>
          ) : (
            <>
              <span>Read</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="relative">
        {postContentOpen ? (
          <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: readContent }} />
            </div>

            <div className="mt-6 flex items-center justify-end text-slate-400 text-xs font-medium">
              <div className="flex items-center gap-1">
                <HeartIcon className="w-3 h-3" />
                <span>Thanks for reading</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="group relative w-full h-[400px] sm:h-[500px] bg-slate-100 overflow-hidden cursor-pointer"
            onClick={handleRead}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                <span className="text-slate-400 text-sm">Loading image...</span>
              </div>
            )}
            <Image
              src={postImg}
              alt="Post visual"
              fill
              className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
                imageLoaded
                  ? "scale-100 group-hover:scale-105"
                  : "scale-105 blur-sm"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-90">
              <p className="text-sm font-medium drop-shadow-sm">
                Click to read full story
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Meta (Optional, if we want to add more, but current design integrates it into header) */}
    </div>
  );
};

export default Post;
