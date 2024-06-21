"use server";
import "tailwind-scrollbar";
import { shuffleArray } from "@/lib/utils";
import { getUsersForSuggestion } from "@/lib/serverMethods";
import MembersOfClub from "../components/poets/MembersOfClub";

// Type definitions
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

interface User {
  name: string;
  img: string;
  id: number;
  jobtitle: string;
}

export default async function Suggestions() {
  const users: Array<PostType> = await getUsersForSuggestion();
  const usersInfo = shuffleArray(users);

  return (
    <div className="max-w-screen pt-16 md:pl-10 md:pr-10 min-h-screen overflow-auto bg-gray-200 justify-center items-center">
      <div className="pl-10 text-7xl md:text-9xl p-2">
        <div className="pt-2">This is</div>
        <div className="mt-2">
          <div className="text-neutral-600 md:flex">Kalaam</div> Family
        </div>
      </div>
      <div className="flex mt-8 flex-row pb-2 p-6 gap-2 mb-0 m-3 overflow-auto">
        {usersInfo.map((user) => (
          <div key={user.id}>
            <MembersOfClub
              id={user.id}
              image={user.image}
              name={user.name}
              role={user.role}
              roll_number={user.roll_number}
              heading={user.heading}
              content={user.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
