"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import MembersOfClub from "../poets/MembersOfClub";
import "tailwind-scrollbar";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    
    <div className="max-w-screen h-[calc(100vh-5rem)] pt-10 md:pl-10 md:pr-10  overflow-auto bg-gray-200 justify-center items-center">
      <div className="flex gap-3 flex-col  justify-center items-center">
        <div className="flex flex-wrap justify-center gap-3">
          <div>
            <input
              onChange={handleInputChange}
              value={searchTerm}
              type="text"
              name="searchTerm"
              className="p-2 outline-1   border-gray-300 rounded-md focus:outline-none focus:outline-1 focus:border-blue-300"
              placeholder="Type name to search..."
            />
          </div>
          {/* <div
            onClick={() => setSearchTerm(searchTerm)}
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </div> */}
        </div>
      </div>
      <div className="flex flex-wrap justify-center pb-2 md:px-48  gap-3 pt-24 h-auto m-3">
        {isLoading ? (
          <div className="w-full  flex justify-center items-center">
            Loading...
          </div>
        ) : users.length === 0 ? (
          <div className="flex w-auto justify-center items-center">
            <div className="text-lg  text-gray-500">
              {(searchTerm.length > 0 && !isLoading) 
                ? "No member found" 
                : "Please type name in Search Box"}
            </div>
          </div>
        ) : (
          users.map((user) => (
            <div className="flex justify-center items-center" key={user.id}>
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
