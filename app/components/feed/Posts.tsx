"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { shuffleArray } from "@/lib/utils";
import axios from "axios";

interface PostType {
  id: number;
  roll_number: string;
  content: string;
  heading: string;
  image: string;
  created_at: Date;
  user: {
    name: string;
    image?: string;
  };
}

// Client-side function to fetch posts
const fetchPosts = async () => {
  try {
    const res = await axios.get(`api/post`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");    
  }
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        const shuffledPosts = shuffleArray(posts || []);
        setPosts(shuffledPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center">No posts available</div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <Post
            id={post.id.toString()}
            name={post.user.name}
            userImg={
              post.user.image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            postImg={post.image}
            content={post.content}
            heading={post.heading}
          />
        </div>
      ))}
    </>
  );
};

export default Posts;
