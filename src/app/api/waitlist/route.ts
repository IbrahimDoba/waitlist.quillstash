import { db } from "@/db";
import waitlist from "@/db/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const insertedEmail = await db
    .insert(waitlist)
    .values({ email })
    .returning({ id: waitlist.id }); // Return the ID of the newly inserted row

  const id = insertedEmail[0]?.id; // Access the returned ID

  return NextResponse.json({ message: "Email added to waitlist", id }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Error adding email to waitlist", error }, { status: 500 });
  }
};
