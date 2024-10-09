import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { autoId: string } }
) {
    try {
        const { userId } = auth();
        const { autoId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Desautorizado", { status: 401 });
        }

        // Verificar si el auto existe para el usuario
        const auto = await db.auto.findFirst({
            where: {
                id: autoId,
                userId, // Verificamos que el auto pertenezca al usuario
            },
        });

        if (!auto) {
            return new NextResponse("Auto no encontrado o no autorizado", { status: 404 });
        }

        // Realizar la actualización del auto
        const updatedAuto = await db.auto.update({
            where: {
                id: autoId,
            },
            data: {
                ...values, // Aquí puedes desestructurar los valores para actualizar
            },
        });

        return NextResponse.json(updatedAuto);
    } catch (error) {
        console.log("[ID DE AUTO]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
}
