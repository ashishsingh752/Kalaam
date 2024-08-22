import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { postSchema } from "@/app/validator/postSchema";
import { CustomErrorReporter } from "@/app/validator/customErrorReportor";
import { DeleteImage, UploadImage } from "@/public/uploads/upload";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const users = await prisma.post.findUnique({
    where: {
      post_id: params.id,
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
  { params }: { params: { id: string } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  const findPost = await prisma.post.findFirst({
    where: {
      post_id: params.id,
      user_id: Number(session?.user?.id),
    },
  });

  if (!findPost)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  //  delete the image from the database
  const imageUrl: string = findPost.public_id;
  if (imageUrl) {
    const result_delete = await DeleteImage(imageUrl);
  }

  await prisma.post.delete({
    where: {
      post_id: params.id,
      user_id: Number(session?.user?.id),
    },
  });

  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}

//! Upadate Post
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the session and check if the user is authenticated
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.redirect("/auth/signin");
    }

    const postId = params.id;
    const userId = Number(session.user?.id);
    // console.log("Post ID: ", postId);

    // Find the post and delete the existing image if present
    const findPost = await prisma.post.findFirst({
      where: {
        post_id: postId,
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

    // Update the post with the new data
    await prisma.post.update({
      where: {
        post_id: postId,
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
    return NextResponse.json({
      status: 200,
      message: "Post updated successfully",
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
