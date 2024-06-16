import React from "react";
import Post from "./Post";
import { getPost } from "@/lib/serverMethods";
import Env from "../../config/env";

interface Post {
  id: string;
  name: string;
  userImg: string;
  postImg: string;
  content: string;
  heading: string;
}

interface PostType {
  id: number;
  roll_number: string;
  content: string;
  heading: string;
  image: string;
}

const Posts: React.FC = async () => {
  const newPosts: Array<PostType> | [] = await getPost();

  return (
    <div>
      {newPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id.toString()}
          name={post.heading}
          userImg={
            `${Env.APP_URL}uploads/${post.image}` ||
            `https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=`
          }
          postImg={`${Env.APP_URL}uploads/${post.image}`}
          content={post.content}
          heading={post.heading}
        />
      ))}
    </div>
  );
};

export default Posts;
