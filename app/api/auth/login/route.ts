import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import type { Database } from "@firebase/database";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import bcryptjs from "bcryptjs";
import prisma from "@/db";
import { loginSchema } from "@/app/validator/loginSchema";

export async function POST(request: NextRequest) {
  try {
    // console.log("hi Ashish you hit this route");
    const data = await request.json();
    console.log(data);

    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(loginSchema);
    const payload = await validator.validate(data);

    const user = await prisma.user.findUnique({
      where: { roll_number: payload.roll_number },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "Wrong Credential! check email or password",
      });
    }

    const validPassword = bcryptjs.compareSync(
      payload.password,
      user.password!
    );

    if (validPassword) {
      return NextResponse.json({
        user,
        status: 200,
        message: "User logged in successfully !",
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Wrong Credential! password not matched",
    });
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error);
      return NextResponse.json({ status: 400, error: error });
    }
  }
}
