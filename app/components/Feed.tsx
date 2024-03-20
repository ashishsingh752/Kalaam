import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";

export default function Feed() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          {/* story of the poets */}
          <Stories />

          {/* new posts of the poets */}
          <Posts />
        </section>

        <section className=" hidden  md:inline-grid md:col-span-1">
           {/* user profile */}
          <div>
            <MiniProfile/>
          </div>

          {/* name of poests to see */}
          <div>

          </div>
        </section>
      </main>
    </>
  );
}
