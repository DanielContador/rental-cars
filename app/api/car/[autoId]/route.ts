import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    { params } : { params : { autoId : string }}
    ){
        try {
            const {userId} = auth();
            const {autoId} = params;
            const { publicado } = await req.json()

            if(!userId){
                return new NextResponse("Desautorizado", {status:401})
            }

            const auto = await db.auto.update({
                where: {
                    id: autoId,
                    userId
                },
                data:{
                    publicado : publicado
                }
            });

            return NextResponse.json(auto);

        } catch (error) {
            console.log("[AUTO ID PATCH]", error)
            return new NextResponse("Error interno", {status:500})
        }
    }

export async function DELETE(
    req: Request,
    {
        params,
    } : {
        params: { autoId : string } ;
    }
) {
    try {
        const {userId} = auth();
        const {autoId} = params

        if(!userId){
            return new NextResponse("Desautorizado", {status:401})
        }

        const eliminarAuto = await db.auto.delete({
            where: {
                id: autoId,
            },
        });

        return NextResponse.json(eliminarAuto);
    } catch(error) {
        console.log("[ELIMINAR AUTO]", error);
        return new NextResponse("Error interno", {status:500});
    }
}