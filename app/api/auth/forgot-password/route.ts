import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { sendPasswordResetEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { identifier } = await request.json();

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json({
        status: 400,
        message: "Email or roll number is required.",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { roll_number: identifier.trim() },
          { email: identifier.trim() },
        ],
      },
      select: { id: true, email: true, name: true },
    });

    // Always return success to avoid leaking whether a user exists
    if (!user) {
      return NextResponse.json({
        status: 200,
        message:
          "If an account with that identifier exists, a password reset link has been sent to the registered email.",
      });
    }

    // Invalidate any existing unused tokens for this user
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Create a new token (expires in 1 hour)
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Build the reset URL
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // Send the email
    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json({
      status: 200,
      message:
        "If an account with that identifier exists, a password reset link has been sent to the registered email.",
    });
  } catch (error: any) {
    console.error("[Forgot Password Error]", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred. Please try again later.",
    });
  }
}
