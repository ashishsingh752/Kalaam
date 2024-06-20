import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { promises as fsPromises, rmSync } from "fs";
import { join } from "path";
import { imageValidator } from "@/app/validator/imageValidator";
import { getRandomNumber } from "@/lib/utils";

export async function POST(req: NextRequest, res: NextResponse) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = Number(session?.user?.id);
    const findUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    const formData = await req.formData();

    if (!findUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (findUser.image) {
      const dir = join(process.cwd(), "public", "uploads");
      const path = join(dir, findUser.image);
      rmSync(path, { force: true });
    }

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      roll_number: formData.get("roll_number") as string,
      role: formData.get("role") as string,
      image: "",
    };

    // Handle image upload
    const image = formData.get("profileImage") as File | null;
    if (image && image instanceof File) {
      const isImageNotValid = imageValidator(image.name, image.size);
      if (isImageNotValid) {
        return NextResponse.json({
          status: 400,
          errors: { content: "Invalid image file" },
        });
      }

      try {
        // Save the new image to the uploads folder
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "uploads");
        const uniqueName = `${Date.now()}-${getRandomNumber(1, 99999)}`;
        const imgExt = image.name.split(".").pop();
        const fileName = `${uniqueName}.${imgExt}`;

        await fsPromises.mkdir(uploadDir, { recursive: true });
        await fsPromises.writeFile(join(uploadDir, fileName), buffer);
        data.image = fileName;
      } catch (error) {
        console.error("Error uploading image: ", error);
        return NextResponse.json({
          status: 500,
          error: "Internal server error",
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
