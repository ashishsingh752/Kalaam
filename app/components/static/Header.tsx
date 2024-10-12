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
import SearchBox from "../search/SearchBox";

export default async function Header() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full  top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-between py-3 px-5 md:px-11">
        {/* Left side */}
        <HeaderLogo />

        {/* Right side */}
        <div className="flex md:gap-2  items-center md:space-x-4">
          <div className=" hidden md:block min-w-auto md:right-auto items-center  max-w-lg mx-2 rounded-full  relative">
            <SearchBox />
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
            <div className="gap-2 flex justify-center items-center">
              {session && (session?.user?.role === "Admin" || session?.user?.role === "President" )  && (
                <div>
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
            </div>
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
