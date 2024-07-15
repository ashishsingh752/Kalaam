import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { DeleteImage } from "@/public/uploads/upload";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  try {
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
        roll_number: true,
        image: true,
        role: true,
        approved: true,
        mobile_number:true,
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

export async function DELETE(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: Number(session.user?.id),
    },
  });

  if (!findUser) {
    return NextResponse.json({ status: 404, message: "User Not Found" });
  }

  const userProfileImageUrl = findUser.public_id;
  if (userProfileImageUrl) {
    const deleteImage = await DeleteImage(userProfileImageUrl);
  }

  try {
    const users = await prisma.user.delete({
      where: {
        id: Number(session.user?.id),
      },
    });

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
