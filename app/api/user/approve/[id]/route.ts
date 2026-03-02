import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { sendApprovalEmail, sendDenialEmail } from "@/lib/mailer";

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

    // Send approval email (non-blocking, don't fail the request if email fails)
    try {
      await sendApprovalEmail(updatedUser.email, updatedUser.name);
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
    }

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

    // Send denial email BEFORE deleting (we need user data for the email)
    try {
      await sendDenialEmail(userData.email, userData.name);
    } catch (emailError) {
      console.error("Failed to send denial email:", emailError);
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
