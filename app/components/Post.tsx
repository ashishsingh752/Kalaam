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

const Posts: React.FC<PostsProps> = ({
  userImg,
  postImg,
  caption,
  username,
  id,
}) => {
  return (
    <div className="bg-white my-7 rounded-md">
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
      <Image
        src={postImg}
        alt="postImage"
        width={2000}
        height={400}
        className="w-full"
      />
      {/*  buttons*/}
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex space-x-4 ">
          <HeartIcon className="h-7 hover:scale-125 transition-transform duration-100 ease-out cursor-pointer" />
          <ChatBubbleOvalLeftEllipsisIcon className="h-7 hover:scale-125 transition-transform duration-100 ease-out cursor-pointer" />
        </div>
        <div>
          <BookmarkIcon className="h-7 hover:scale-125 transition-transform duration-100 ease-out cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
