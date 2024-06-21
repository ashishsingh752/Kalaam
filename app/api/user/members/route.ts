import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

// ! status:200
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        image: true,
        role: true,
        Post: {
          select: {
            id: true,
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

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
