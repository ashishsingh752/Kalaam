import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { DeleteImage, UploadImage } from "@/public/uploads/upload";

//! Profile Update API  - Now it's working fine. No need to change anything.

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

    if (!findUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const profileData = await {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      roll_number: formData.get("roll_number") as string,
      role: formData.get("role") as string,
      mobile_number: formData.get("mobile_number") as string,
      yearOfStudy: formData.get("yearOfStudy") as string,
    };

    const image = formData.get("image") as unknown as File;

    let updateData: any = {
      name: profileData.name,
      email: profileData.email,
      roll_number: profileData.roll_number,
      mobile_number: profileData.mobile_number,
      yearOfStudy: profileData.yearOfStudy,
    };

    if (image && image.size > 0 && image.name !== "undefined") {
      // delete the image from the coudinary
      const imageUrl = findUser.public_id;
      if (imageUrl) {
        await DeleteImage(imageUrl);
      }

      // upload image to cloudinary
      const uploadImage: any = await UploadImage(image, "kalaam-images");
      updateData.image = uploadImage.secure_url;
      updateData.public_id = uploadImage.public_id;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ! status:200
export async function GET(request: NextRequest) {
  try {
    console.log("fetching data from the data base...");
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          approved: false,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        roll_number: true,
        mobile_number: true,
        image: true,
        role: true,
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
    console.log("data fetched successfully", users);

    return NextResponse.json({ status: 200, data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
