import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../prisma/client";
import validateToken from "../misc/validateToken";
import { z } from "zod";

const orderSchema = {
  create: z.object({
    bookId: z.string(),
    customerName: z.string(),
  }),
};

export async function GET(req: NextRequest) {
  try {
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

    const isTokenValid = await validateToken(token);

    if (isTokenValid.error !== false)
      return NextResponse.json(isTokenValid, {
        status: 400,
      });

    const tempRequest = await db.order.findMany({
      where: {
        createdBy: token,
      },
    });

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

// Create Order
export async function POST(req: NextRequest) {
  try {
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

    const isTokenValid = await validateToken(token);

    if (isTokenValid.error !== false)
      return NextResponse.json(isTokenValid, {
        status: 400,
      });

    const body = await req.json();

    if (!orderSchema.create.safeParse(body).success)
      return NextResponse.json(
        { message: "Invalid data received." },
        { status: 400 }
      );

    const tempRequest = await db.order.create({
      data: {
        bookId: body.bookId,
        customerName: body.customerName,
        quantity: 1,
        createdBy: token,
      },
    });

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
