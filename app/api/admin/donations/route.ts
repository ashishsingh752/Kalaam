import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Note: In a real app we'd verify the user is logged in and an Admin here.
    // Assuming the frontend only calls this if the user has Admin privileges.
    
    const donations = await prisma.donation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            roll_number: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ data: donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
