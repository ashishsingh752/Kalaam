import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/app/validator/registerSchema";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import bcryptjs from "bcryptjs";
import prisma from "@/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data);
    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(data);

    // Check if the user already exists by email
    const isEmailExist = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        error: {
          email: "Email already exists. Please try another one.",
        },
      });
    }

    // Check if the user already exists by roll number
    const isRollNumberExist = await prisma.user.findUnique({
      where: { roll_number: payload.roll_number },
    });

    if (isRollNumberExist) {
      return NextResponse.json({
        status: 400,
        error: {
          roll_number: "User already exists with the same roll number.",
        },
      });
    }

    // Encrypt the user's password with bcrypt
    payload.password = bcryptjs.hashSync(payload.password, 10);

    // Store the user details in the database
    const response = await prisma.user.create({
      data: payload,
    });

    // Exclude the password from the response
    const { password, ...userWithoutPassword } = response;

    // Return the user data after excluding the password
    return NextResponse.json({
      status: 200,
      message: "User created successfully!",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log("Validation Error: ", error.messages);
      return NextResponse.json({ status: 400, error: error.messages });
    } else {
      console.error("Unexpected error: ", error);
      return NextResponse.json({ status: 500, error: "Internal server error" });
    }
  }
}
