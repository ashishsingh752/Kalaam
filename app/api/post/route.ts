import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { postSchema } from "@/app/validator/postSchema";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import vine, { errors } from "@vinejs/vine";
import { imageValidator } from "@/app/validator/imageValidator";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import { promises as fsPromises, rmSync } from "fs";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json({
    status: 200,
    data: posts,
  });
}


export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.redirect("/auth/signin");
    }

    const formData = await req.formData();
    const data = {
      content: formData.get("content"),
      heading: formData.get("heading"),
      image: "",
    };

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);

    const image = formData.get("image") as File | null;

    if (image && image instanceof File) {
      const isImageNotValid = imageValidator(image.name, image.size);
      if (isImageNotValid) {
        return NextResponse.json({
          status: 400,
          errors: { content: "Invalid image file" },
        });
      }

      try {
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "uploads");
        const uniqueName = `${Date.now()}-${getRandomNumber(1, 99999)}`;
        const imgExt = image.name.split(".").pop();
        const fileName = `${uniqueName}.${imgExt}`;

        await fsPromises.mkdir(uploadDir, { recursive: true });
        await fsPromises.writeFile(`${uploadDir}/${fileName}`, buffer);
        data.image = fileName;
      } catch (error) {
        console.error("Error uploading image: ", error);
        return NextResponse.json({ status: 500, error: "Internal server error" });
      }
    }

    await prisma.post.create({
      data: {
        content: payload.content,
        heading: payload.heading,
        user_id: Number(session?.user?.id),
        image: data.image,
      },
    });

    return NextResponse.json({ status: 200, message: "Post created successfully" });

  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log("Validation Error: ", error.messages);
      return NextResponse.json({ status: 400, error: error.messages });
    } else {
      console.error("Unexpected error: ", error);
      return NextResponse.json({ status: 500, error: "Internal server error" });
    }
  }
}

