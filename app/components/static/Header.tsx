import Image from "next/image";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import UserProfile from "../authentication/UserProfile";
import SidebarMannager from "./SidebarManager";
import { HandleLoginButtom, HomeButton } from "../buttons/Button";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import CreateNewPostButton from "../post/CreateNewPostButton";
import { HeaderLogo } from "./Logo";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white w-full shadow-sm sticky min-w-full top-0 z-30 border-b">
      <div className="container min-w-full  flex items-center justify-around py-3 px-6">
        {/* Left side */}
        <HeaderLogo />

        {/* Middle - Search bar */}
        <div className="flex min-w-1  items-center flex-grow max-w-lg mx-2 rounded-full p-1 relative">
          <input
            type="text"
            className="flex-grow min-w-1 outline outline-slate-500 bg-transparent p-2 rounded-full border-none"
            placeholder={"Search by writer's name..."}
          />
          <MagnifyingGlassIcon className="text-gray-500 hidden sm:block w-8 h-8 absolute right-2" />
        </div>

        {/* Right side */}
        <div className="flex gap-2  items-center md:space-x-4">
          <div className="hidden md:block">
            <HomeButton />
          </div>
          {session ? (
            <>
              {/* add user profile dropdowm */}
              <div className="hidden md:block">
                <CreateNewPostButton />
              </div>
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
