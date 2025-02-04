import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      user_Id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
