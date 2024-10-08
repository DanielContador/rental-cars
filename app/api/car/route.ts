import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const data = await req.json()

        if(!userId) {
            return new NextResponse("No autorizado", {status: 401})

        }

        const car = await db.auto.create({
            data: {
                userId,
                ...data
            }
        })

        return NextResponse.json(car)

    } catch (error) {
        console.log("[CAR]", error)
        return new NextResponse("Error Interno", {status :500})
    }
}