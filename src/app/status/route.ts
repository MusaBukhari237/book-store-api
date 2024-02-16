import { NextRequest, NextResponse } from "next/server";
import getStatus from "../misc/getStatus";

export async function GET(req: NextRequest) {
  const status: number = await getStatus();

  if (status === 200)
    return NextResponse.json(
      {
        status: "ok",
        code: 200,
        message: "The API is up and running smoothly.",
      },
      { status: 200 }
    );
  else if (status === 300)
    return NextResponse.json(
      {
        status: "offline",
        code: 300,
        message:
          "The API service is currently offline. Please try again later.",
      },
      { status: 300 }
    );
  else
    return NextResponse.json(
      {
        status: "error",
        code: 400,
        message:
          "An unexpected error occurred while processing your request. Please try again later or contact support for assistance.",
      },
      { status: 400 }
    );
}
