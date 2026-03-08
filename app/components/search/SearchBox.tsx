"use client";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface QuickUser {
  id: number;
  userId: string;
  name: string;
  image: string;
  role: string;
}

interface QuickPost {
  id: number;
  post_id: string;
  heading: string;
  image: string;
  user: {
    name: string;
    image: string;
  };
}

export default function SearchBox() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<QuickUser[]>([]);
  const [posts, setPosts] = useState<QuickPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback(async (term: string) => {
    if (!term.trim()) {
      setUsers([]);
      setPosts([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/api/search", { searchTerm: term });
      const data = res.data.data;
      setUsers((data?.users || []).slice(0, 3));
      setPosts((data?.posts || []).slice(0, 3));
      setIsOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      setIsOpen(false);
      router.push(`/search?q=${searchTerm}`);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults = users.length > 0 || posts.length > 0;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative flex w-full items-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-4 w-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          className="block w-full rounded-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm leading-6 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900"
          placeholder="Search poets & posts..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchTerm.trim() && hasResults) setIsOpen(true);
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 w-[340px] max-h-[420px] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-2xl shadow-black/10 dark:shadow-black/40 z-[100] animate-fadeIn custom-scrollbar">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full skeleton" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-2/3 skeleton rounded" />
                    <div className="h-2.5 w-1/3 skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : !hasResults ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                No results for &quot;{searchTerm}&quot;
              </p>
            </div>
          ) : (
            <div className="py-2">
              {/* Users Section */}
              {users.length > 0 && (
                <div>
                  <div className="px-4 py-2">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                      Poets
                    </p>
                  </div>
                  {users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/userposts/?id=${user.userId}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Image
                        src={
                          user.image ||
                          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                        }
                        alt={user.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-slate-700"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {user.role}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Divider */}
              {users.length > 0 && posts.length > 0 && (
                <div className="mx-4 my-1 border-t border-gray-100 dark:border-slate-800" />
              )}

              {/* Posts Section */}
              {posts.length > 0 && (
                <div>
                  <div className="px-4 py-2">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                      Posts
                    </p>
                  </div>
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/post/${post.post_id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 shrink-0 relative">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.heading}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs">
                            ✦
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {post.heading}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          by {post.user?.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View All */}
              <div className="border-t border-gray-100 dark:border-slate-800 mt-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/search?q=${searchTerm}`);
                  }}
                  className="w-full px-4 py-3 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  View all results →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
