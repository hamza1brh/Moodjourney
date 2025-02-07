import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const user = await getUserByClerkId();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: content || "",
      },
    });

    //    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
  } catch (error) {
    console.error("Failed to create entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
