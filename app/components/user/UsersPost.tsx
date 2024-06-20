"use client"; // Use client directive for components using Suspense
import React, { useState, useEffect } from "react";
import { getUserPosts } from "@/lib/serverMethods";
import { DeletePostButton } from "../buttons/Button";
import { useRouter } from "next/navigation";

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
}

function truncateText(text: string, wordLimit: number): string {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}

const UsersPost = () => {
  const [userPost, setUserPost] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const posts = await getUserPosts();
        const transformedPosts = posts.map((post) => ({
          id: post.id,
          content: post.content,
          heading: post.heading,
          image: post.image,
        }));
        setUserPost(transformedPosts);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (userPost.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        You haven&apos;t posted anything yet.
        <div className="flex">
          Wanna Post?{" "}
          <div
            onClick={() => router.push("/newpost")}
            className="cursor-pointer text-blue-500 underline ml-2"
          >
            Click here
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userPost.map((post: PostType) => (
        <div key={post.id} className="flex justify-center p-5">
          <div className="border border-gray-300 p-5 rounded-md lg:w-1/2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="ml-2">
                  <div className="text-xl font-bold">{post.heading}</div>
                </div>
              </div>
            </div>
            <div className="text-sm ml-2 mt-2 truncate-2-lines">
              {truncateText(post.content, 20)}
            </div>
            <div className="flex mt-4 gap-5 justify-center items-center">
              <div
                onClick={() => router.push(`/updatepost?id=${post.id}`)}
                className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded-md font-medium text-base hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
              >
                Update
              </div>

              <DeletePostButton id={post.id}  heading={post.heading} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersPostWrapper = () => {
  return <UsersPost />;
};

export default UsersPostWrapper;
