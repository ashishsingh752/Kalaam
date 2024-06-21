"use client";
import { getUserPostsToRead } from "@/lib/serverMethods";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Post from "../feed/Post";
import { BackToHome } from "../buttons/Button";

interface PostType {
  id: number;
  content: string;
  heading: string;
  image: string;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  roll_number: string;
  image: string;
  posts: Array<PostType>;
}
// ! passing the props for the specific user posts
export default function ReadUsersPost() {
  const [userPosts, setUserPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  //   console.log("userId is: ", userId);
  //   const userId = 3;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPostsResponse = await getUserPostsToRead({
          id: Number(userId),
        });
        setUserImage(userPostsResponse.image);
        if (userPostsResponse && userPostsResponse.name) {
          setUserName(userPostsResponse.name);
        }
        if (userPostsResponse && userPostsResponse.Post) {
          const transformedPosts = userPostsResponse.Post.map((post) => ({
            key: post.id,
            id: post.id,
            content: post.content,
            heading: post.heading,
            image: post.image,
          }));
          setUserPosts(transformedPosts);
        }
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex  bg-gray-200 h-screen items-center justify-center">
        <Image
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={100}
          height={100}
          alt="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (userPosts.length === 0 || !userPosts) {
    return (
      <div className="h-[calc(100vh-5rem)] bg-gray-200 flex justify-center items-center">
        <div className="gap-4">
          <div className="mb-2 text-2xl">No posts found</div>
          <div className="flex justify-center items-center">
            <BackToHome />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 justify-center items-center">
      <div>
        <div className="">
          {userPosts.map((post) => (
            <div className="w-96" key={post.id}>
              <Post
                id={post.id.toString()}
                name={userName}
                userImg={
                 userImage||
                  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                postImg={post.image}
                content={post.content}
                heading={post.heading}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <BackToHome />
      </div>
    </div>
  );
}
