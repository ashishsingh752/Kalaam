import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchTerm } = await req.json();
    if (searchTerm === " " || !searchTerm) {
      return NextResponse.json({
        status: 400,
        message: "Please provide a search term",
      });
    }

    // Search users by name (wildcard, case-insensitive)
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });

    // Search posts by heading (wildcard, case-insensitive)
    const posts = await prisma.post.findMany({
      where: {
        heading: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            userId: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        create_at: "desc",
      },
    });

    return NextResponse.json({
      status: 200,
      data: {
        users,
        posts,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
