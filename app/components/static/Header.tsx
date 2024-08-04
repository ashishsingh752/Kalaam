import UserProfile from "../authentication/UserProfile";
import SidebarMannager from "./SidebarManager";
import {
  HandleLoginButtom,
  HandleSearchRoute,
  HomeButton,
  PostButton,
} from "../buttons/Button";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateNewPostButton from "../post/CreateNewPostButton";
import { HeaderLogo } from "./Logo";
import DashboardButton from "../admin/DashboardButton";
import Events from "../buttons/Events";
import Contact from "../buttons/Contact";
import MembersButton from "../buttons/Memebers";

export default async function Header() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full  top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-between py-3 px-5 md:px-11">
        {/* Left side */}
        <HeaderLogo />

        {/* Right side */}
        <div className="flex md:gap-2  items-center md:space-x-4">
          <div className="flex min-w-auto md:right-auto items-center  max-w-lg mx-2 rounded-full  relative">
            <input
              type="text"
              className=" w-32 sm:w-44 outline outline-slate-500 bg-transparent  rounded-full border-none"
              placeholder={"Search"}
            />
            <div className="text-gray-500 flex bg-gray-200 rounded-r-full justify-center items-center  w-8 h-full absolute right-0">
              <HandleSearchRoute />
            </div>
          </div>

          <div className=" hidden md:block ">
            <div className="flex gap-1 md:gap-6">
              <HomeButton />
              {/* <Events /> */}
              <MembersButton />
              <Contact />
              <PostButton />
            </div>
          </div>

          {session ? (
            <>
              {/* add user profile dropdowm */}
              {/* <div className="hidden md:block">
                <CreateNewPostButton />
              </div> */}

              {/* show dashboard for admin only */}
              {session && (session?.user?.role === "Admin" || session?.user?.role === "President" )  && (
                <div className="hidden md:block">
                  <DashboardButton />
                </div>
              )}

              {/* use profile icon */}
              <div className="cursor-pointer">
                <UserProfile />
              </div>

              <div className="cursor-pointer">
                <SidebarMannager />
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:block">
                <HandleLoginButtom />
              </div>
              <div className="right-10">
                <SidebarMannager />
              </div>
            </>
          )}
        </div>
      </div>
      <div></div>
    </header>
  );
}
