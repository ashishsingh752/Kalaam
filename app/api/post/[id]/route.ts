import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { getRandomNumber } from "@/lib/utils";
import { imageValidator } from "@/app/validator/imageValidator";
import { postSchema } from "@/app/validator/postSchema";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import { promises as fsPromises, rmSync } from "fs";
import { DeleteImage, UploadImage } from "@/public/uploads/upload";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const users = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data: users });
}

//! To delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  const findPost = await prisma.post.findFirst({
    where: {
      id: Number(params.id),
      user_id: Number(session?.user?.id),
    },
  });

  if (!findPost)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  if (findPost.image !== "" && findPost.image !== null) {
    const dir = join(process.cwd(), "public", "/uploads");
    const path = dir + "/" + findPost?.image;
    rmSync(path, { force: true });
  }

  await prisma.post.delete({
    where: {
      id: Number(params.id),
      user_id: Number(session?.user?.id),
    },
  });

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}

//! Upadate Post
export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    // Get the session and check if the user is authenticated
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.redirect("/auth/signin");
    }

    const postId = Number(params.id);
    const userId = Number(session.user?.id);
    // console.log("Post ID: ", postId);

    // Find the post and delete the existing image if present
    const findPost = await prisma.post.findFirst({
      where: {
        id: postId,
        user_id: userId,
      },
    });

    if (!findPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // to delete the image present in couldinary server
    const postImage = findPost.public_id;
    if (postImage) {
      const result_delete = await DeleteImage(postImage);
    }

    // if (findPost.image) {
    //   const dir = join(process.cwd(), "public", "uploads");
    //   const path = join(dir, findPost.image);
    //   rmSync(path, { force: true });
    // }

    const formData = await req.formData();
    const data = {
      content: formData.get("content"),
      heading: formData.get("heading"),
      image: "",
    };
    console.log("Data: ", data);

    // Upload the image into the cloudinary
    const image = formData.get("image") as unknown as File;
    const updatedImageUrl: any = await UploadImage(image, "kalaam-images");


    // Validate the data
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);

    // Handle image upload
    // const image = formData.get("image") as File | null;
    // if (image && image instanceof File) {
    //   const isImageNotValid = imageValidator(image.name, image.size);
    //   if (isImageNotValid) {
    //     return NextResponse.json({ status: 400, errors: { content: "Invalid image file" } });
    //   }

    //   try {
    //     // Save the new image to the uploads folder
    //     const buffer = Buffer.from(await image.arrayBuffer());
    //     const uploadDir = join(process.cwd(), "public", "uploads");
    //     const uniqueName = `${Date.now()}-${getRandomNumber(1, 99999)}`;
    //     const imgExt = image.name.split(".").pop();
    //     const fileName = `${uniqueName}.${imgExt}`;

    //     await fsPromises.mkdir(uploadDir, { recursive: true });
    //     await fsPromises.writeFile(join(uploadDir, fileName), buffer);
    //     data.image = fileName;
    //   } catch (error) {
    //     console.error("Error uploading image: ", error);
    //     return NextResponse.json({ status: 500, error: "Internal server error" });
    //   }
    // }

    // Update the post with the new data
    await prisma.post.update({
      where: {
        id: postId,
        user_id: userId,
      },
      data: {
        content: payload.content,
        heading: payload.heading,
        user_id: userId,
        image: updatedImageUrl.secure_url,
        public_id: updatedImageUrl.public_id,
      },
    });

    // Return success message if the post is updated successfully
    return NextResponse.json({ status: 200, message: "Post updated successfully" });

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
