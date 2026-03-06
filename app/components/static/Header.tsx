import Link from "next/link";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { HeaderLogo } from "./Logo";
import DashboardButton from "../admin/DashboardButton";
import SearchBox from "../search/SearchBox";
import UserProfile from "../authentication/UserProfile";
import SidebarMannager from "./SidebarManager";
import NotificationManager from "../notifications/NotificationManager";
import ThemeToggle from "../ThemeToggle";

export default async function Header() {
  const session: CustomSession | null = await getServerSession(authOptions);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/poets" },
    { name: "Contact", href: "/contact" },
    { name: "Post", href: "/newpost" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="pt-6 pointer-events-auto">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/40 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 px-4 shadow-lg shadow-black/[0.03] dark:shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/[0.04] sm:px-6 lg:px-8 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
            {/* Logo Section */}
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/" className="">
                <HeaderLogo />
              </Link>
            </div>

            {/* Center Navigation (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-gray-100/50 dark:bg-slate-800/50 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative rounded-full px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm active:scale-95"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Section: Search & Auth */}
            <div className="hidden items-center gap-6 md:flex">
              {/* Search Bar */}
              <div className="relative w-56 lg:w-64 transition-all duration-300 focus-within:w-72">
                <SearchBox />
              </div>

              {/* Divider */}
              <div
                className="h-6 w-px bg-gray-200 dark:bg-slate-700"
                aria-hidden="true"
              ></div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                {session ? (
                  <>
                    {(session?.user?.role === "Admin" ||
                      session?.user?.role === "President") && (
                      <div className="opacity-80 hover:opacity-100 transition-opacity">
                        <DashboardButton />
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <NotificationManager />
                      <div className="h-8 w-px bg-gray-100 dark:bg-slate-700 mx-1"></div>
                      <div className="cursor-pointer ring-2 ring-transparent hover:ring-indigo-100 dark:hover:ring-indigo-900 rounded-full transition-all">
                        <UserProfile />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 dark:bg-white px-6 py-2.5 text-sm font-medium text-white dark:text-gray-900 shadow-md transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>Sign up</span>
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile View / Sidebar Trigger */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              {session ? (
                <div className="flex items-center gap-2">
                  {(session?.user?.role === "Admin" ||
                    session?.user?.role === "President") && <DashboardButton />}
                  <UserProfile />
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 shadow-md transition-all hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  <span>Log in</span>
                </Link>
              )}

              <div className="relative">
                <SidebarMannager isAuthenticated={!!session} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
