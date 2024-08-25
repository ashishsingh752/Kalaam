"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import MembersOfClub from "../poets/MembersOfClub";
import "tailwind-scrollbar";
import { useSearchParams, useRouter } from "next/navigation";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  let val = searchParams.get("q");

  // Synchronize the searchTerm with the query parameter from the URL
  useEffect(() => {
    if (val) {
      setSearchTerm(val);
    }
  }, [val]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `/api/search`,
          { searchTerm },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res.data.data);
        setUsers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchMembers();
    } else {
      setUsers([]);
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

  return (
    <div className="max-w-screen h-[calc(100vh-5rem)] pt-10 px-4 md:px-10 overflow-auto bg-gray-200 flex flex-col  items-center">
      <div className="flex flex-col w-full md:w-1/2 gap-3 mb-10">
        <div className="relative flex items-center">
          <input
            onChange={handleInputChange}
            value={searchTerm}
            type="text"
            name="searchTerm"
            className="p-2 px-5 rounded-full w-full border-gray-300 outline-none focus:border-blue-300 focus:ring-1"
            placeholder="Type name to search..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 px-4 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 h-auto w-full md:px-10">
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-10">
            Loading...
          </div>
        ) : users.length === 0 ? (
          <div className="w-full flex justify-center items-center py-10">
            <div className="text-lg text-gray-500">
              {searchTerm.length > 0 && !isLoading
                ? "No member found"
                : "Please type name in Search Box"}
            </div>
          </div>
        ) : (
          users.map((user) => (
            <div className="flex justify-center items-center" key={user.id}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
