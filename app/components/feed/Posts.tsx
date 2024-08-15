"use client";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

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

// Client-side function to fetch posts with pagination
const fetchPosts = async (start: number, limit: number) => {
  try {
    const res = await axios.get(`api/post`, {
      params: {
        start,
        limit,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentStart, setCurrentStart] = useState(0);
  const limit = 5;

  useEffect(() => {
    const getInitialPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(currentStart, limit);
        if (fetchedPosts.length < limit) {
          setHasMore(false);
        }
        setPosts(fetchedPosts);
        setCurrentStart((prevStart) => prevStart + fetchedPosts.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    getInitialPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (!hasMore) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fetchedPosts = await fetchPosts(currentStart, limit);
      if (fetchedPosts.length < limit) {
        setHasMore(false);
      }
      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      setCurrentStart((prevStart) => prevStart + fetchedPosts.length);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Image
          className="h-10 w-10"
          src={`https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif`}
          width={40}
          height={40}
          alt="Loading..."
        />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center">No posts available</div>
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-4">
            <Image
              className="h-8 w-8 animate-spin"
              src={`https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif`}
              width={32}
              height={32}
              alt="Loading more posts..."
            />
          </div>
        }
        endMessage={<h3 className="p-4 flex justify-center items-center">You reached the End</h3>}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
