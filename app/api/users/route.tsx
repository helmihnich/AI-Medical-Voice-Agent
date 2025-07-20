import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  try {
    const users = await db.select().from(usersTable)
    //@ts-ignore
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    // If no user exists, create a new one with default credits
    if (users.length === 0) {
      const result = await db.insert(usersTable).values({
        name: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        credits: 10,
        //@ts-ignore
      }).returning({usersTable});
      return NextResponse.json({user: result[0]?.usersTable});
    }
    // Return the user data
    return NextResponse.json({ user: users[0] });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
