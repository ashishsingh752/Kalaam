import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

const Feed: React.FC = () => {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          {/* new posts of the poets */}
          <Posts />
        </section>
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="w-[385px] ">
            {/* user profile */}
            <div className="">
              <MiniProfile />
            </div>
            {/* name of poets to see */}
            <div className="mt-5 bg-white max-h-96 overflow-scroll overflow-x-hidden">
              <Suggestions />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Feed;
