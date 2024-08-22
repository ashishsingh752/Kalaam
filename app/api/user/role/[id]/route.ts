import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    const { role } = await request.json();
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    console.error("Error changing user role:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
