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
import { UploadImage } from "@/public/uploads/upload";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            roll_number: true,
            email: true,
            image: true,
            role: true,
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
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
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

    // upload the image into the cloudinary
    const image = formData.get("image") as unknown as File;

    //  check if the image is not found in the request body
    if (!image) {
      return NextResponse.json({
        status: 404,
        message: "No image found in request body",
      });
    }
    const imageUrl: any = await UploadImage(image, "kalaam-images");

    // removed this code to upload the image into the cloudinary
    // if (image && image instanceof File) {
    //   const isImageNotValid = imageValidator(image.name, image.size);
    //   if (isImageNotValid) {
    //     return NextResponse.json({
    //       status: 400,
    //       errors: { content: "Invalid image file" },
    //     });
    //   }

    //   try {
    //     const buffer = Buffer.from(await image.arrayBuffer());
    //     const uploadDir = join(process.cwd(), "public", "uploads");
    //     const uniqueName = `${Date.now()}-${getRandomNumber(1, 99999)}`;
    //     const imgExt = image.name.split(".").pop();
    //     const fileName = `${uniqueName}.${imgExt}`;

    //     await fsPromises.mkdir(uploadDir, { recursive: true });
    //     await fsPromises.writeFile(`${uploadDir}/${fileName}`, buffer);
    //     data.image = fileName;
    //   }

    //   catch (error) {
    //     console.error("Error uploading image: ", error);
    //     return NextResponse.json({
    //       status: 500,
    //       error: "Internal server error",
    //     });
    //   }
    // }

    await prisma.post.create({
      data: {
        content: payload.content,
        heading: payload.heading,
        user_id: Number(session?.user?.id),
        image: imageUrl.secure_url,
        public_id: imageUrl.public_id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Post created successfully",
    });
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
