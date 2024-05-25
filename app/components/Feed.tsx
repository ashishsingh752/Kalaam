import React from "react";
import Home from "./Home";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import SidebarMannager from "./SidebarManager";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed: React.FC = () => {
  return (
    <>
      <div className="absolute flex">
        <SidebarMannager />
      </div>
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          {/* new posts of the poets */}
          {/* <Home /> */}
          <Posts />
        </section>
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="w-[385px]">
            {/* user profile */}
            <div className="">
              <MiniProfile />
            </div>
            {/* name of poets to see */}
            <Suggestions />
          </div>
        </section>
      </main>
    </>
  );
};

export default Feed;
