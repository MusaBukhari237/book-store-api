import validateToken from "@/app/misc/validateToken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../../prisma/client";

const orderSchema = {
  update: z.object({
    customerName: z.string(),
  }),
};

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
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

    const tempRequest = await db.order.findUnique({
      where: {
        id: id,
        createdBy: token,
      },
    });

    if (!tempRequest)
      return NextResponse.json(
        { error: `No order with id ${id}.` },
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

// Update Order
export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
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

    if (!orderSchema.update.safeParse(body).success)
      return NextResponse.json(
        { message: "Invalid data received." },
        { status: 400 }
      );

    const tempRequest = await db.order.update({
      where: {
        id: id,
        createdBy: token,
      },
      data: {
        customerName: body.customerName,
      },
    });

    if (!tempRequest)
      return NextResponse.json(
        { error: `No order with id ${id}.` },
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

// Delete Order
export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
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

    const tempRequest = await db.order.delete({
      where: {
        id: id,
        createdBy: token,
      },
    });

    if (!tempRequest)
      return NextResponse.json(
        { error: `No order with id ${id}.` },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      {
        deleted: true,
        message: `Order with id ${id} has been deleted successfully.`,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Error occurred." },
      {
        status: 400,
      }
    );
  }
}
