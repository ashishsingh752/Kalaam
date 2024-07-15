import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } } // id should be a string, not a number
) {
  try {
    const userId = Number(params.id);

    // Check if the user exists
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

    // Update the user's approval status
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        approved: true,
      },
    });

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    console.error("Error updating user approval status:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // id should be a string, not a number
) {
  try {
    const userId = Number(params.id);

    // Check if the user exists
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
    
    // Delete the user
    const updatedUser = await prisma.user.delete({
      where: {
        id: userId,
      }
    });

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    console.error("Error updating user approval status:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
