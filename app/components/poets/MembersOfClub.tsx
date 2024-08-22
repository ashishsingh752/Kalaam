import Image from "next/image";
import { FC } from "react";
import { ReadUsersPostButton } from "../buttons/Button";

interface MembersOfClubProps {
  id: string;
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_bwZrOyCQJhPMvpxqrv-xmqEBzAJAKJtT-VpWkSQ-4AppODnHxANcPsX-RTiIYlcrXE&usqp=CAU"
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
          {role}
        </div>

        <div className="flex justify-center font-semibold text-blue-400 mt-1 mb-1">
          <ReadUsersPostButton id={id} />
        </div>
      </div>
    </div>
  );
};

export default MembersOfClub;
