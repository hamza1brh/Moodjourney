import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { id } = await params;
  const { content } = await request.json();
  const user = await getUserByClerkId();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
