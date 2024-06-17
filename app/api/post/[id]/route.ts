import prisma from "@/db";
import { rmSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const users = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data: users });
}

//! To delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  const findPost = await prisma.post.findFirst({
    where: {
      id: Number(params.id),
      user_id: Number(session?.user?.id),
    },
  });

  if (!findPost)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  if (findPost.image !== "" && findPost.image !== null) {
    const dir = join(process.cwd(), "public", "/uploads");
    const path = dir + "/" + findPost?.image;
    rmSync(path, { force: true });
  }

  await prisma.post.delete({
    where: {
      id: Number(params.id),
      user_id: Number(session?.user?.id),
    },
  });

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}

//! Upadate Post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postId = Number(params.id);
  const userId = Number(session.user?.id);

  const findPost = await prisma.post.findFirst({
    where: {
      id: postId,
      user_id: userId,
    },
  });

  if (!findPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const newData = await request.json();

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: newData.content,
        heading: newData.heading,
        image: newData.image,
      },
    });

    return NextResponse.json(
      { message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
