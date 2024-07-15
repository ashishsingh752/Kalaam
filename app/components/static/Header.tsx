import Image from "next/image";
import UserProfile from "../authentication/UserProfile";
import SidebarMannager from "./SidebarManager";
import {
  HandleLoginButtom,
  HandleSearchRoute,
  HomeButton,
} from "../buttons/Button";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateNewPostButton from "../post/CreateNewPostButton";
import { HeaderLogo } from "./Logo";
import DashboardButton from "../admin/DashboardButton";

export default async function Header() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-between py-3 px-5 md:px-11">
        {/* Left side */}
        <HeaderLogo />

        {/* Middle - Search bar */}

        {/* Right side */}
        <div className="flex gap-2  items-center md:space-x-4">
          <div className="flex min-w-auto  items-center  max-w-lg mx-2 rounded-full p-1 relative">
            <input
              type="text"
              className=" w-32 sm:w-44 outline outline-slate-500 bg-transparent p-2 rounded-full border-none"
              placeholder={"Search"}
            />
            {/* <MagnifyingGlassIcon className="text-gray-500   w-6 h-8 absolute right-2" /> */}
            <div className="text-gray-500 flex  justify-center items-center  w-6 h-8 absolute right-2">
              <HandleSearchRoute />
            </div>
          </div>

          <div className="hidden md:block">
            <HomeButton />
          </div>
          {session ? (
            <>
              {/* add user profile dropdowm */}
              <div className="hidden md:block">
                <CreateNewPostButton />
              </div>
              {session && session?.user?.role === "Admin" && (
                <div className="hidden md:block">
                  <DashboardButton />
                </div>
              )}
              <div className="cursor-pointer">
                <UserProfile />
              </div>
            </>
          ) : (
            <>
              <HandleLoginButtom />
            </>
          )}
        </div>
      </div>
      <div className="max-w-0 max-h-0">
        {/* sidebar to be available in all  pages  */}
        <SidebarMannager />
      </div>
    </header>
  );
}
