import React from "react";
import Post from "./Post";
import { getPost } from "@/lib/serverMethods";
import Env from "../../config/env";
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
  /*
  const placeholderPosts: Post[] = [
    {
      id: "1",
      name: "Ashish Singh",
      userImg:
        "https://images.unsplash.com/photo-1497316730643-415fac54a2af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      postImg:
        "https://images.unsplash.com/photo-1658042390856-7cf51f7dda21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      content: "Thank for reading this",
      heading: "Ashish Singh",
    },
    {
      id: "2",
      name: "Ashish Singh",
      userImg:
        "https://images.unsplash.com/photo-1497316730643-415fac54a2af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      postImg:
        "https://images.unsplash.com/photo-1682687981603-ae874bf432f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
      content: "Thank for reading this",
      heading: "Ashish Singh",
    },
    {
      id: "3",
      name: "Ashish Singh",
      userImg:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImg:
        "https://images.unsplash.com/photo-1710743387064-ca0cb9d77b11?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "Thank for reading this",
      heading: "Ashish Singh",
    },
    {
      id: "4",
      name: "Ashish Singh",
      userImg:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      postImg:
        "https://images.unsplash.com/photo-1710302122056-a4fd87c037d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
      content: "Thank for reading this",
      heading: "Ashish Singh",
    },
  ];
  */
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
            post.image
              ? `${Env.APP_URL}uploads/${post.image}`
              : post.image ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          postImg={
            post.image ? `${Env.APP_URL}uploads/${post.image}` : post.image
          }
          content={post.content}
          heading={post.heading}
        />
      ))}
    </div>
  );
};

export default Posts;
