import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import type { Database } from "@firebase/database";
import { registerSchema } from "@/app/validator/registerSchema";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  // const requestUrl = new URL(request.url);
  // const formData = await request.formData();
  // const email = String(formData.get("email"));
  // const password = String(formData.get("password"));
  // const cookieStore = cookies();
  // const supabase = createRouteHandlerClient<Database>({
  //   cookies: () => cookieStore,
  // });

  try {
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(registerSchema);  // add the userchema validation 
    const payload = await validator.validate(data);  
    payload.password = bcryptjs.hashSync(payload.password, 10); // encrypt the user passworld to the 10 round of salting 
    const { password: pass, ...res } = payload;    // exclude the password form the payload
    // console.log(res);
    return NextResponse.json({ status: 200, res });   // return the user data after excluding the password from the user data 
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error);
      return NextResponse.json({ status: 400, error: error });
    }
  }

  // await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     emailRedirectTo: `${requestUrl.origin}/auth/callback`,
  //   },
  // });

  // return NextResponse.redirect(requestUrl.origin, {
  //   status: 301,
  // });
}
