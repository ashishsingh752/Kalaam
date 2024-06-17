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