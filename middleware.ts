import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import type { Database } from "@firebase/database";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const isUser = await supabase.auth.getSession();
  if (!isUser.data) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/account', '/home'
  ],
};
