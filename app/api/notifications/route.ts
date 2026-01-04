import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import redis from "@/lib/redis";

export async function GET(req: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user?.id;
    
    if (!redis) {
      return NextResponse.json({
        status: 200,
        data: [],
      });
    }

    const notifications = await redis.lrange(`notifications:${userId}`, 0, -1);
    const parsedNotifications = notifications.map((n) => JSON.parse(n));

    return NextResponse.json({
      status: 200,
      data: parsedNotifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const userId = session.user?.id;
      if (redis) {
        await redis.del(`notifications:${userId}`);
      }
  
      return NextResponse.json({
        status: 200,
        message: "Notifications cleared",
      });
    } catch (error) {
      console.error("Error clearing notifications:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
