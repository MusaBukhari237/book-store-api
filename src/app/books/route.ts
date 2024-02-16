import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const tempRequest = await db.book.findMany();
    console.log(tempRequest);
    if (!tempRequest)
      return NextResponse.json(
        { error: "Error occurred." },
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
