"use client";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { getPost } from "@/lib/serverMethods";
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
}

const Post: React.FC<PostsProps> = ({
  userImg,
  postImg,
  content,
  name,
  id,
  heading,
}) => {
  const [postContent, setPostContent] = useState<boolean>(false);
  const [readContent, setReadContent] = useState<string>("");

  const handleRead = () => {
    setPostContent(!postContent);
    setReadContent(postContent ? "" : content);
  };

  return (
    <div className="bg-white  md:m-7 my-7 rounded-md">
      {/* post header */}
      <div className="flex items-center p-5">
        <Image
          src={userImg}
          alt={name}
          width={100}
          height={90}
          className="rounded-full p-1 w-12 mr-3 h-12 object-cover border"
        />
        <p className="font-bold flex-1">{name || heading}</p>
        <div className="text-right mr-2 cursor-pointer" onClick={handleRead}>
          {postContent ? "close" : "read"}
        </div>
      </div>

      {/* Users post image */}
      <div className="post-image-container">
        {postContent && (
          <div className="p-5 max-h-96 overflow-auto pt-0">
            {readContent}
            <div
              className="text-right mr-2 cursor-pointer"
              onClick={handleRead}
            >
              {postContent ? "close" : "read"}
            </div>
          </div>
        )}
        {!postContent && (
          <div className="transition-transform duration-6000">
            <Image
              src={postImg}
              alt="postImage"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              className="rounded-sm md:w-50 md:h-50"
            />
          </div>
        )}
      </div>

      {/*  buttons*/}
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="h-7 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
        </div>
      </div>

      <p className="p-5 truncate">
        <span className="font-semibold mr-2">Author:</span>
        <span className="font italic">{name}</span>
      </p>
    </div>
  );
};

export default Post;
