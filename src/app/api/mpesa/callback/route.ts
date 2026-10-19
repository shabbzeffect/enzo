import { validateCallback } from "@/lib/mpesa";
import { prisma } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("M-Pesa callback:", JSON.stringify(body, null, 2));

    const validated = validateCallback(body);
    if (!validated) {
      console.warn("Invalid callback format");
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const { checkoutRequestId, resultCode, resultDesc, callbackMetadata } = validated;

    if (resultCode === 0) {
      const mpesaReceiptNumber = callbackMetadata.MpesaReceiptNumber;
      const transactionDate = callbackMetadata.TransactionDate;
      const phoneNumber = callbackMetadata.PhoneNumber;
      const amount = callbackMetadata.Amount;

      await prisma.enquiry.updateMany({
        where: { mpesaCheckoutRequestId: checkoutRequestId },
        data: {
          mpesaReceiptNumber,
          mpesaTransactionDate: new Date(transactionDate.toString()),
          mpesaPhoneNumber: phoneNumber.toString(),
          mpesaAmount: amount,
          status: "paid",
        },
      });

      console.log(`Payment successful: ${mpesaReceiptNumber} for ${amount} KSh`);
    } else {
      await prisma.enquiry.updateMany({
        where: { mpesaCheckoutRequestId: checkoutRequestId },
        data: { status: "failed" },
      });
      console.log(`Payment failed: ${resultDesc}`);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Rejected" }, { status: 500 });
  }
}