import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({
        status: 400,
        message: "Token and new password are required.",
      });
    }

    if (password.length < 6) {
      return NextResponse.json({
        status: 400,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Find the token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: { select: { id: true, email: true } } },
    });

    if (!resetToken) {
      return NextResponse.json({
        status: 400,
        message: "Invalid or expired reset link.",
      });
    }

    if (resetToken.used) {
      return NextResponse.json({
        status: 400,
        message: "This reset link has already been used.",
      });
    }

    if (new Date() > resetToken.expiresAt) {
      // Mark as used so it can't be retried
      await prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      });
      return NextResponse.json({
        status: 400,
        message: "This reset link has expired. Please request a new one.",
      });
    }

    // Hash the new password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Update user password and mark token as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: "Password reset successfully! You can now sign in with your new password.",
    });
  } catch (error: any) {
    console.error("[Reset Password Error]", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred. Please try again later.",
    });
  }
}
