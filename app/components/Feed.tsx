import Post from "./Posts";
import Stories from "./Stories";

export default function Feed() {
  return (
    <main>
      <section>
        {/*  stories */}
        <Stories />
        {/* post */}
        <Post />
      </section>

      <section>
        {/* mini profile */}
        {/* suggestions */}
      </section>
    </main>
  );
}
