import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {

  const expiredReservations =
    await prisma.reservation.findMany({
      where: {
        status: "pending",
        expiresAt: {
          lt: new Date(),
        },
      },
    });

  for (const reservation of expiredReservations) {

    await prisma.inventory.update({
      where: {
        id: reservation.inventoryId,
      },
      data: {
        reservedStock: {
          decrement: reservation.quantity,
        },
      },
    });

    await prisma.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        status: "expired",
      },
    });
  }

  return NextResponse.json({
    message: "Cleanup completed",
    expiredReservations:
      expiredReservations.length,
  });
}