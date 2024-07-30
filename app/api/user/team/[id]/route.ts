import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const users = await prisma.user.findMany({
      where: {
        yearOfStudy: params.id,
      },
    });

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
