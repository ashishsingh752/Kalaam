import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../[...nextauth]/options";
import prisma from "@/db";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({
        status: 401,
        message: "You must be signed in to change your password.",
      });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({
        status: 400,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({
        status: 400,
        message: "New password must be at least 6 characters long.",
      });
    }

    const userId = Number(session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user || !user.password) {
      return NextResponse.json({
        status: 400,
        message: "Password cannot be changed for this account.",
      });
    }

    // Verify current password
    const isValid = bcryptjs.compareSync(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({
        status: 403,
        message: "Current password is incorrect.",
      });
    }

    // Hash and update
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      status: 200,
      message: "Password updated successfully!",
    });
  } catch (error: any) {
    console.error("[Update Password Error]", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred. Please try again later.",
    });
  }
}
