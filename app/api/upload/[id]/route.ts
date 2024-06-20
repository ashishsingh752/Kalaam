import prisma from "@/db";
import { DeleteImage, UploadImage } from "@/public/uploads/upload";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";

export const POST = async (
  req: NextRequest,
  res: NextResponse,
  ctx: { params: { id: string } }
) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  try {

    //  this is to delete the image from cloudinary server
    const imagePublicId = "kalaam-images/" + ctx.params.id;
    const result_delete = await DeleteImage(imagePublicId);

    await prisma.user.delete({
      where: {
        id: Number(session?.user?.id),
      },
    });

    return NextResponse.json({
      status: 200,
      message: result_delete,
    });
  } catch (error) {
    console.error("Error parsing form data:", error);
    return NextResponse.json({ status: 500, error });
  }
};
