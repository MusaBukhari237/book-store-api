import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as db } from "@prisma/client/edge";

export default async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      {
        error: "Missing Authorization header.",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders", "/orders/:path*"],
};
