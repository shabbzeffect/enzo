import { auth } from "@/auth";
import { stkPush, formatPhone } from "@/lib/mpesa";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { phone, amount, accountReference, transactionDesc, retailerSlug, productSlug } = body;

    if (!phone || !amount || !accountReference) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await stkPush({
      phone: formatPhone(phone),
      amount,
      accountReference,
      transactionDesc: transactionDesc || `Payment for ${accountReference}`,
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/mpesa/callback`,
    });

    return NextResponse.json({
      success: true,
      checkoutRequestId: result.CheckoutRequestID,
      merchantRequestId: result.MerchantRequestID,
      responseCode: result.ResponseCode,
      responseDescription: result.ResponseDescription,
    });
  } catch (error: any) {
    console.error("STK Push error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.errorMessage || error.message || "STK Push failed" },
      { status: 500 }
    );
  }
}