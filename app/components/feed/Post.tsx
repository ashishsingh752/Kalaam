import Image from "next/image";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

interface PostsProps {
  userImg: string;
  postImg: string;
  caption: string;
  username: string;
  id: string;
}

const Post: React.FC<PostsProps> = ({
  userImg,
  postImg,
  caption,
  username,
  id,
}) => {
  return (
    <div className="bg-white md:m-7 my-7 rounded-md">
      {/* post header */}
      <div className="flex items-center p-5">
        <Image
          src={userImg}
          alt={username}
          width={100}
          height={90}
          className="rounded-full p-1 w-12 mr-3 h-12 object-cover border"
        />
        <p className="font-bold flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* Users post image */}
      <div className="post-image-container ">
        <Image
          src={postImg}
          alt="postImage"
          width={100}
          height={100}
          layout="responsive"
          objectFit="cover"
          className="rounded-sm md:w-50 md:h-50 "
        />
      </div>

      {/*  buttons*/}
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex space-x-4 ">
          <HeartIcon className="h-7 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
          <ChatBubbleOvalLeftEllipsisIcon className="h-7 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
        </div>
        <BookmarkIcon className="h-7 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
      </div>

      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>

      {/* post comments section  */}

      <form className="flex items-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <input
          className="border-none w-2 flex-1 focus:ring-0"
          type="text"
          placeholder="Comment..."
        />
        <button className="font-bold text-blue-400">Post</button>
      </form>

    </div>
  );
};

export default Post;
