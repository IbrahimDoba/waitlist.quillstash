import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;
export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }
  resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: audienceId!,
  });
  return NextResponse.json(
    { message: "Email send successfully" },

  );
}
