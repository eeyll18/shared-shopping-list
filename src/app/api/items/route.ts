import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const items = await prisma.shoppingItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Ürünler getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, quantity } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Ürün adı zorunludur." },
        { status: 400 }
      );
    }

    const newItem = await prisma.shoppingItem.create({
      data: {
        name,
        quantity,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Ürün eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
