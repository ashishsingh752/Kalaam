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
    <div className="group relative w-64 h-[320px] bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Avatar Container */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-100 to-indigo-100 group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-500">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
            <Image
              src={
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_bwZrOyCQJhPMvpxqrv-xmqEBzAJAKJtT-VpWkSQ-4AppODnHxANcPsX-RTiIYlcrXE&usqp=CAU"
              }
              alt={name}
              width={128}
              height={128}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center flex-grow flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h4>
          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">
            {role}
          </p>
        </div>

        {/* Action Button */}
        <div className=" text-red-900">
          <ReadUsersPostButton id={id} />
        </div>
      </div>
    </div>
  );
};

export default MembersOfClub;
