import Image from "next/image";
import { root } from "postcss";

interface SuggestionProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
}

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
}

//!   this is the suggestion  in the home page

const Suggestion: React.FC<SuggestionProps> = ({
  image,
  name,
  heading,
  content,
  roll_number,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-2">
      {/* <div className="flex justify-center items-center"> */}

      <div>
        <Image
          src={
            "https://images.unsplash.com/photo-1682686581221-c126206d12f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMjZ8fHxlbnwwfHx8fHw%3D"
          }
          alt="user img"
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-full h-14 w-14 border p-[2px]"
        />
      </div>

      <div className="flex-1 ml-4">
        <h2 className="font-bold">{name}</h2>
        <h3 className="text-gray-400 text-sm w-[165px] truncate">
          {roll_number}
        </h3>
      </div>
      <button className=" font-semibold ml-10 text-blue-400">Read</button>
    </div>
  );
};

export default Suggestion;
