import Image from "next/image";

interface StoryProps {
  imgSrc: string;
  username: string;
}

const Story: React.FC<StoryProps> = ({ imgSrc, username }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="relative w-26 h-26">
        <Image
          src={imgSrc}
          alt={`Profile picture of ${username}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full border border-gray-500 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        />
      </div>
      <p className="text-xs text-center w-20 truncate">{username}</p>
    </div>
  );
};

export default Story;
