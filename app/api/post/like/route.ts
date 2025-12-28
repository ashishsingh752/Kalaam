import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { post_id } = await req.json();

    if (!post_id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { post_id: post_id },
      select: { id: true }
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        user_id_post_id: {
          user_id: Number(session.user?.id),
          post_id: post.id,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ message: "Unliked", liked: false }, { status: 200 });
    } else {
      // Like
      await prisma.like.create({
        data: {
          user_id: Number(session.user?.id),
          post_id: post.id,
        },
      });
      return NextResponse.json({ message: "Liked", liked: true }, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error in Like API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
