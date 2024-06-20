import prisma from "@/db";
import { UploadImage } from "@/public/uploads/upload";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    }); 
  }
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;

    if (!image) {
      return NextResponse.json({
        status: 404,
        message: "No image found in request body",
      });
    }

    const data: any = await UploadImage(image, "kalaam-images");

    const imageUpload = await prisma.user.findFirst({
      where: {
        id: Number(session?.user?.id),
      },
    });

    if (!imageUpload) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    await prisma.user.update({
      where: {
        id: Number(session?.user?.id),
      },
      data: {
        image: data.secure_url,
        public_id: data.public_id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: data,
    });
  } catch (error) {
    console.error("Error parsing form data:", error);
    return NextResponse.json({ status: 500, error });
  }
};
