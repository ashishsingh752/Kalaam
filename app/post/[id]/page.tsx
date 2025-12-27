import { getSinglePost } from "@/lib/serverMethods";
import Post from "@/app/components/feed/Post";
import { BackToHome } from "@/app/components/buttons/Button";
import { notFound } from "next/navigation";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getSinglePost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-page py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8">
        <BackToHome />
      </div>

      <div className="w-full max-w-4xl animate-fadeIn">
        <Post
          id={post.post_id}
          heading={post.heading}
          content={post.content}
          postImg={post.image}
          name={post.user.name}
          userImg={post.user.image || "/default-avatar.png"}
          createdAt={post.create_at}
        />
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Published on Kalaam &bull; Shared with love</p>
      </div>
    </div>
  );
}
