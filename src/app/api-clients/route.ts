import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../prisma/client";
import { z } from "zod";
import moment from "moment";

const apiClientSchema = {
  create: z.object({
    clientName: z.string().min(1),
    clientEmail: z.string().email(),
  }),
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!apiClientSchema.create.safeParse(body).success)
      return NextResponse.json(
        { message: "Invalid data received." },
        { status: 400 }
      );

    const tempRequest1 = await db.user.findMany({
      where: {
        email: body.clientEmail,
      },
    });

    if (tempRequest1.length > 0)
      return NextResponse.json(
        {
          error: "API client already registered. Try a different email.",
        },
        {
          status: 400,
        }
      );

    const tempRequest = await db.user.create({
      data: {
        name: body.clientName,
        email: body.clientEmail,
        expiryDate: new Date(moment().add(7, "days") as any),
      },
    });

    if (!tempRequest)
      return NextResponse.json(
        { error: "Error occurred." },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      { accessToken: tempRequest.id },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Error occurred." },
      {
        status: 400,
      }
    );
  }
}
