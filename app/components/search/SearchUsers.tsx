"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MembersOfClub from "../poets/MembersOfClub";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaUsers, FaFeatherAlt } from "react-icons/fa";

interface PostResult {
  id: number;
  post_id: string;
  heading: string;
  content: string;
  image: string;
  create_at: string;
  user: {
    name: string;
    image: string;
    userId: string;
  };
  _count: {
    likes: number;
  };
}

const formatTimestamp = (date: string) => {
  try {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<PostResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"poets" | "posts">("poets");
  const router = useRouter();
  const searchParams = useSearchParams();
  let val = searchParams.get("q");

  useEffect(() => {
    if (val) {
      setSearchTerm(val);
    }
  }, [val]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `/api/search`,
          { searchTerm },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = res.data.data;
        setUsers(data?.users || []);
        setPosts(data?.posts || []);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    } else {
      setUsers([]);
      setPosts([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setUsers([]);
    setPosts([]);
  };

  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>/g, "") || "";
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] px-4 md:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Search Kalaam
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Find poets and poems across the community
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              onChange={handleInputChange}
              value={searchTerm}
              type="text"
              className="block w-full rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 py-4 pl-13 pr-24 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 shadow-sm focus:shadow-lg"
              style={{ paddingLeft: "3.25rem" }}
              placeholder="Search by name, title, or content..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={handleSearch}
                className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-indigo-600 text-white text-sm font-medium hover:bg-gray-800 dark:hover:bg-indigo-500 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {searchTerm && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-gray-100 dark:bg-slate-800/80 border border-gray-200/50 dark:border-slate-700/50">
              <button
                onClick={() => setActiveTab("poets")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "poets"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <FaUsers className="text-base" />
                Poets
                {!isLoading && users.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold">
                    {users.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "posts"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <FaFeatherAlt className="text-base" />
                Posts
                {!isLoading && posts.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold">
                    {posts.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-4">
          {isLoading ? (
            <div className="max-w-2xl mx-auto space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50 p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full skeleton" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 skeleton rounded" />
                      <div className="h-3 w-1/2 skeleton rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !searchTerm ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-lg font-medium">
                Start typing to search
              </p>
              <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">
                Search for poets by name or posts by title & content
              </p>
            </div>
          ) : activeTab === "poets" ? (
            /* Poets Tab */
            users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <FaUsers className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-base font-medium">
                  No poets found for &quot;{searchTerm}&quot;
                </p>
                <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-5">
                {users.map((user) => (
                  <div
                    className="flex justify-center items-center"
                    key={user.id}
                  >
                    <MembersOfClub
                      id={user.userId}
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
            )
          ) : /* Posts Tab */
          posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <FaFeatherAlt className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-base font-medium">
                No posts found for &quot;{searchTerm}&quot;
              </p>
              <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.post_id}`}
                  className="group block rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Post Thumbnail */}
                    {post.image && (
                      <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.heading}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-slate-800/20" />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {post.heading}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed font-serif italic">
                          {stripHtml(post.content).substring(0, 200)}
                          {stripHtml(post.content).length > 200 ? "..." : ""}
                        </p>
                      </div>

                      {/* Author + Meta */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-slate-700/50">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={
                              post.user?.image ||
                              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                            }
                            alt={post.user?.name || "Author"}
                            width={28}
                            height={28}
                            className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-slate-700"
                          />
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {post.user?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                          <span>{post._count?.likes || 0} ♥</span>
                          <span>{formatTimestamp(post.create_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
