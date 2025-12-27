"use server";
import prisma from "@/db";
import Env from "../app/config/env";
import { headers } from "next/headers";
import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

//! Get all posts 
//! Queries the database directly to avoid server-side fetch issues in production
export async function getPost() {
  try {
    const posts = await prisma.post.findMany({
      take: 20,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            roll_number: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function getUserPosts() {
  const session: CustomSession | null = await getServerSession(authOptions);
  try {
    const posts = await prisma.post.findMany({
      where: {
        user_id: Number(session?.user?.id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            roll_number: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}


//! Get all users - queries database directly
export async function getUser() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        image: true,
        role: true,
        approved: true,
        mobile_number: true,
        userId: true,
        Post: {
          select: {
            id: true,
            post_id: true,
            content: true,
            heading: true,
            image: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}


//! this is not working in the production when I change the Env.APP_URL to actual url i.e. https://kalaam-nitrkl.vercel.app/
export async function getUserPostsToUpdate(post: { id: string }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  try {
    const posts = await prisma.post.findUnique({
      where: {
        post_id: post.id,
        user_id: Number(session?.user?.id),
      },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}

export async function getUsersForSuggestion() {
  const res = await fetch(`${Env.APP_URL}/api/user/members`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch Users");
  }
  const response = await res.json();
  return response?.data;
}

// ! to get all the posts of a specific user to read 
export async function getUserPostsToRead(user: { id: string }) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        image: true,
        role: true,
        Post: {
          select: {
            post_id: true,
            content: true,
            heading: true,
            image: true,
            create_at: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    if (!userData) {
      throw new Error(`User with id ${user.id} not found`);
    }

    return userData;
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}

// ! Get a single post by post_id
export async function getSinglePost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        post_id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            roll_number: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch single post:", error);
    throw new Error("Failed to fetch single post");
  }
}
