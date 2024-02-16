import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const tempRequest = await db.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!tempRequest)
      return NextResponse.json(
        { error: `No book with id ${id}.` },
        {
          status: 400,
        }
      );

    return NextResponse.json(tempRequest, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Error occurred." },
      {
        status: 400,
      }
    );
  }
}
