import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, tierName } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_support_${Date.now()}`,
      notes: {
        tier: tierName || "Custom Donation",
        purpose: "Kalaam Support",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error: any) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout order" },
      { status: 500 }
    );
  }
}

