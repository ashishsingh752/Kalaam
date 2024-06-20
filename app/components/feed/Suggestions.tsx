import "tailwind-scrollbar";
import Suggestion from "../poets/Suggestion";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUser, getUserPosts } from "@/lib/serverMethods";
import MembersOfClub from "../poets/MembersOfClub";
import { shuffleArray } from "@/lib/utils";
import Env from "@/app/config/env";

interface MembersOfClubProps {
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
  role: string;
}

//!  this is the suggestion in the feed ( home page )
export default async function Suggestions() {
  const session = await getServerSession(authOptions);
  if (!session) return <></>;

  const users: Array<PostType> = await getUser();
  const usersInfo = shuffleArray(users);

  return (
    <div className="flex h-1/6 overflow-x-scroll scrollbar-none flex-wrap p-6 bg-white mt-4">
      <div>
        {usersInfo.map((user) => (
          <>
            <Suggestion
              id={user.id}
              image={user.image}
              name={user.name}
              role={user.role}
              heading={user.heading}
              content={user.content}
              roll_number={user.roll_number}
            />
          </>
        ))}
      </div>
    </div>
  );
}
