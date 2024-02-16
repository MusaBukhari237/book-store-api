import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../prisma/client";

export default async function getStatus(): Promise<number> {
  try {
    const isDbOnline: boolean = await db.$queryRaw`SELECT 1`;

    if (process.env.API_STATUS === "ok" && isDbOnline) return 200;
    else if (process.env.API_STATUS !== "ok") return 300;
    else if (!isDbOnline) return 400;
  } catch (e) {
    return 400;
  }
  return 400;
}
