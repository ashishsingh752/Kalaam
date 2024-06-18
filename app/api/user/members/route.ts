
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/db";

export async function GET(request: NextRequest) {
//   const session: CustomSession | null = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ status: 401, message: "Un-Authorized" });
//   }

  try {
    const users = await prisma.user.findMany({
    //   where: {
    //     NOT: {
    //       id: Number(session.user?.id),
    //     },
    //   },
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        Post: {
          select: {
            id: true,
            content: true,
            heading: true,
            image: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
