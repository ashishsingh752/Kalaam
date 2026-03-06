import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

const ALLOWED_DASHBOARD_ROLES = ["Admin", "President"];

/**
 * Checks if the current user is authenticated and has Admin or President role.
 * Returns the session if authorized, or an appropriate error response if not.
 */
export async function checkAdminOrPresident(): Promise<
  | { authorized: true; session: CustomSession }
  | { authorized: false; response: NextResponse }
> {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      ),
    };
  }

  if (!ALLOWED_DASHBOARD_ROLES.includes(session.user.role ?? "")) {
    return {
      authorized: false,
      response: NextResponse.json(
        { status: 403, message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, session };
}
