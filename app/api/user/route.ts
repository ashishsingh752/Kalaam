import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: Number(session.user?.id),
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({ status: 200, data: users });
}