import Image from "next/image";
import { ReadUsersPostButton } from "../buttons/Button";

interface SuggestionProps {
  id: number;
  content: string;
  heading: string;
  image: string;
  name: string;
  roll_number: string;
  role: string;
}

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
  profileImage: string;
  name: string;
  roll_number: string;
  role: string;
}

//!   this is the for the  suggestion in the home page
const Suggestion: React.FC<SuggestionProps> = ({
  image,
  name,
  heading,
  content,
  roll_number,
  role,
  id,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-2">
      {/* <div className="flex justify-center items-center"> */}

      <div className="relative w-14 h-14 rounded-full overflow-hidden">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1682686581221-c126206d12f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMjZ8fHxlbnwwfHx8fHw%3D"
          }
          alt="user img"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 ml-4">
        <h2 className="font-bold">{name}</h2>
        <h3 className="text-gray-400 text-sm w-[165px] truncate">{role}</h3>
      </div>
      <ReadUsersPostButton id={id} />
      {/* <button className=" font-semibold ml-10 text-blue-400">Read</button> */}
    </div>
  );
};

export default Suggestion;
