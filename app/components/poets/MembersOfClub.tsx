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
const MembersOfClub: FC<MembersOfClubProps> = ({ image, name, role, id }) => {
  return (
    // border border-slate-100 rounded-2xl p-6 flex flex-col items-center transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 overflow-hidden
    <div className="group relative w-64 h-[320px] flex flex-col items-center overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 bg-white shadow-md border border-gray-100">
      <div className="h-24 w-full bg-gradient-to-r from-blue-500 to-gray-600 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="relative -mt-16 mb-3">
        <div className="h-32 w-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white relative">
          <Image
            src={
              image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center flex-grow flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h4>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">
            {role}
          </p>
        <div className="mt-5 text-md">
          <ReadUsersPostButton id={id} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default MembersOfClub;
