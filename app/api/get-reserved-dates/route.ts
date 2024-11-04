
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { autoId } = await req.json();

  if (!autoId) {
    return new NextResponse("Car ID is required", { status: 400 });
  }

  try {
    const reservations = await db.orden.findMany({
      where: {
        autoId: autoId,
        estado: 'confirmed',
      },
      select: {
        ordenInicio: true,
        ordenFin: true,
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reserved dates:", error);
    return new NextResponse("Error fetching reserved dates", { status: 500 });
  }
}
