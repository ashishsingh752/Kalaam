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
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });
    return NextResponse.json({
      status: 200,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
