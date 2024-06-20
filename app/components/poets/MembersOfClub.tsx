import Image from "next/image";
import { FC } from "react";
import { ReadUsersPostButton } from "../buttons/Button";

interface MembersOfClubProps {
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
  name: string;
  roll_number: string;
  role: string;
}

//! This component will shows the members of the club
const MembersOfClub: FC<MembersOfClubProps> = ({
  image,
  name,
  heading,
  content,
  roll_number,
  role,
  id,
}) => {
  return (
    <div className="flex flex-col items-center bg-sky-50 rounded-lg justify-center  ">
      {/* Image of the club member */}
      <div className="w-48 h-44 rounded-md bg-zinc-300 flex justify-center items-center">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1711008995950-2590b21d92a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D"
          }
          alt="user img"
          width={100}
          height={100}
          objectFit="cover"
          className="w-36 h-36 rounded-full  border "
        />
      </div>

      {/* Other details of the club member */}
      <div className="">
        <div className="flex justify-center items-center font-bold">{name}</div>
        <div className="flex justify-center items-center text-gray-400 text-sm w-[150px]">
          {roll_number}
        </div>

        <div className="flex justify-center font-semibold text-blue-400 mt-1 mb-1">
          <ReadUsersPostButton id={id} />
        </div>
      </div>
    </div>
  );
};

export default MembersOfClub;
