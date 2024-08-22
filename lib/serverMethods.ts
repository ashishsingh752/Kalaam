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
//! It works in the production when I change the Env.APP_URL to actual url i.e. https://kalaam-nitrkl.vercel.app/

export async function getPost() {
  const res = await fetch(`https://kalaam-nitrkl.vercel.app/api/post`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth posts");
  }
  const response = await res.json();
  return response?.data;
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


//! this is not working in the production when I change the Env.APP_URL to actual url i.e. https://kalaam-nitrkl.vercel.app/
export async function getUser() {
  const res = await fetch(`https://kalaam-nitrkl.vercel.app/api/user`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth Users");
  }
  const response = await res.json();
  return response?.data;
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
  const res = await fetch(`https://kalaam-nitrkl.vercel.app/api/user/members`, {
    cache: "no-cache",
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fecth Users");
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
        Post: {
          select: {
            post_id: true,
            content: true,
            heading: true,
            image: true,
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
