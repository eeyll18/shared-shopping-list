import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const { name, quantity, purchased } = await request.json();

    const updatedItem = await prisma.shoppingItem.update({
      where: { id },
      data: {
        name,
        quantity,
        purchased,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    await prisma.shoppingItem.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Ürün silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
