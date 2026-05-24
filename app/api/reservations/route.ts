import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { inventoryId, quantity } = body;

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    const availableStock =
      inventory.totalStock - inventory.reservedStock;

    if (availableStock < quantity) {
      return NextResponse.json(
        { error: "Not enough stock" },
        { status: 409 }
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        reservedStock: {
          increment: quantity,
        },
      },
    });

    const reservation = await prisma.reservation.create({
      data: {
        inventoryId,
        quantity,
        status: "pending",
        expiresAt: new Date(
          Date.now() + 1 * 60 * 1000
        ),
      },
    });

    return NextResponse.json(reservation);

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}