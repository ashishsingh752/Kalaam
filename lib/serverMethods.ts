"use server";
import prisma from "@/db";
import Env from "../app/config/env";
import { headers } from "next/headers";
import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function getPost() {
  const res = await fetch(`${Env.APP_URL}api/post`, {
    cache: "no-cache",
    headers: headers(),
  });
  // console.log("ashish");
  // console.log("response is: ", res);
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

export async function getUser() {
  const res = await fetch(`${Env.APP_URL}api/user`, {
    cache: "no-cache",
    headers: headers(),
  });
  // console.log("ashish");
  // console.log("response is: ", res);
  if (!res.ok) {
    throw new Error("Failed to fecth Users");
  }
  const response = await res.json();
  return response?.data;
}

export async function getUserPostsToUpdate(post: { id: number }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id: post.id,
        user_id: Number(session?.user?.id), // Only allow the user to update their own posts
      },
      include: {
        user: {
          select: {
            id: true,
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
  const res = await fetch(`${Env.APP_URL}api/user/members`, {
    cache: "no-cache",
    headers: headers(),
  });
  // console.log("ashish");
  // console.log("response is: ", res);
  if (!res.ok) {
    throw new Error("Failed to fecth Users");
  }
  const response = await res.json();
  return response?.data;
}

export async function getUserPostsToRead(user: { id: number }) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        Post: {
          select: {
            id: true,
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
