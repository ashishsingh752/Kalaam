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
    <div className="bg-white md:m-7 my-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* post header */}
      <div className="flex items-center p-5 bg-gradient-to-r from-white to-purple-50/30">
        <div className="relative group">
          <Image
            src={userImg}
            alt={name}
            width={100}
            height={100}
            className="rounded-full p-1 w-12 mr-3 h-12 object-cover border-2 border-purple-200 transition-all duration-300 group-hover:border-purple-400 group-hover:scale-110"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {heading}
          </p>
          <p className="text-xs text-gray-500 mt-1">by {name}</p>
        </div>
        <button
          onClick={handleRead}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
        >
          {postContentOpen ? (
            <>
              <svg
                className="w-4 h-4"
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
              Close
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Read
            </>
          )}
        </button>
      </div>

      {/* Users post content or image */}
      <div className="relative">
        {postContentOpen ? (
          <div className="p-6 max-h-96 overflow-auto animate-fade-in bg-gradient-to-b from-white to-purple-50/20">
            <div
              className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: readContent }}
            ></div>
            <div className="mt-6 pt-4 border-t border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="text-sm font-medium">
                    Thank you for reading!
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-96 bg-gray-100 overflow-hidden group">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <Image
              src={postImg}
              alt="postImage"
              fill
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>

      {/* Author info */}
      <div className="p-5 bg-gradient-to-r from-white to-indigo-50/30 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Author:</span>{" "}
          <span className="italic text-purple-600 font-medium">{name}</span>
        </p>
      </div>
    </div>
  );
};

export default Post;
