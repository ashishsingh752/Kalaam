import React from "react";
import Post from "./Post";
import { getPost } from "@/lib/serverMethods";
import { shuffleArray } from "@/lib/utils";

interface PostType {
  id: number;
  roll_number: string;
  content: string;
  heading: string;
  image: string;
  created_at: Date;
}

const Posts: React.FC = async () => {
  const newPosts: Array<PostType> | [] = await getPost();

  // Shuffle both fetched and placeholder posts
  const combinedPosts = shuffleArray([...newPosts]);

  return (
    <div>
      {combinedPosts.map((post) => (
        <Post
          key={post.id}
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
      ))}
    </div>
  );
};

export default Posts;
