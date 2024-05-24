import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import SidebarMannager from "./SidebarMannager";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

export default function Feed() {
  return (
    <>
      <div className="absolute flex  ">
        <SidebarMannager />
      </div>
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          {/* story of the poets */}
          {/* <Stories /> */}
          {/* new posts of the poets */}
          <Posts />
        </section>
        <section className=" hidden  md:inline-grid md:col-span-1">
          <div className=" w-[385px]">
            {/* user profile */}
            <MiniProfile />
            {/* name of poests to see */}
            <Suggestions />
          </div>
        </section>
      </main>
    </>
  );
}
