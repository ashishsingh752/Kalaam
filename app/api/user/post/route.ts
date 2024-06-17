import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/db";
import { join } from "path";
import { rmSync } from "fs";

//! Fetch all the posts of the user

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get the user ID from the session and check if it's valid or not
  const userId = session.user?.id ? Number(session.user.id) : null;
  if (!userId)
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

  // Fetch all the posts of the user
  const posts = await prisma.post.findMany({
    where: {
      user_id: userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({ data: posts }, { status: 200 });
}


