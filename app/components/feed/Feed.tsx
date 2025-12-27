import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

const Feed: React.FC = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 pt-0 pb-8">
      {/* Main Content Area - Posts */}
      <section className="col-span-1 space-y-6 -mt-4 lg:col-span-3">
        {/* new posts of the poets */}
        <Posts />
      </section>

      {/* Sidebar Area */}
      <section className="hidden lg:block lg:col-span-1">
        <div className="sticky top-28 space-y-6 mt-6">
          {/* user profile */}
          <MiniProfile />

          {/* suggestions */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
