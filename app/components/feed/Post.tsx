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

  const handleRead = () => {
    setPostContentOpen(!postContentOpen);
    setReadContent(postContentOpen ? "" : content);
  };

  return (
    <div className="bg-white  md:m-7 my-7 rounded-md">
      {/* post header */}
      <div className="flex items-center p-5">
        <Image
          src={userImg}
          alt={name}
          width={100}
          height={100}
          className="rounded-full p-1 w-12 mr-3 h-12 object-fill border"
        />
        <p className="font-bold flex-1">{heading}</p>
        <div className="text-right mr-2 cursor-pointer" onClick={handleRead}>
          {postContentOpen ? "close" : "read"}
        </div>
      </div>

      {/* Users post image */}
      <div className="">
        {postContentOpen && (
          <div className="p-5 max-h-96 overflow-auto pt-0">
            <div
              className="text-sm ml-2 mt-2"
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: readContent }}
            ></div>
            <div className="text-right">
              <div className="flex mt-5 pl-2  justify-between">
                <div>Thank you for reading this post!</div>
                <div
                  className="text-right text-red-500  cursor-pointer"
                  onClick={handleRead}
                >
                  {postContentOpen ? "close" : ""}
                </div>
              </div>
            </div>
          </div>
        )}
        {!postContentOpen && (
          <div className="transition-transform duration-600">
            <div className="relative w-full h-96 md:w-50 md:h-50 rounded-sm ">
              <div className="h-96 w-96">
                <Image
                  src={postImg}
                  alt="postImage"
                  fill
                  loading="lazy"
                  className="rounded-sm h-96 object-fill"
                />
              </div>
            </div>
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
