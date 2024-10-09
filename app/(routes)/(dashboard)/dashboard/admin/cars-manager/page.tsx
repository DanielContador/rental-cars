import { auth } from "@clerk/nextjs/server";
import { ButtonAddCar } from "./components/ButtonAddCar";
import { ListCars } from "./components/ListCars";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function CarsManagerPage(){
    const {userId} = auth()

    if(!userId){
        return redirect("/")
    }

    const car = await db.auto.findMany({
        where: {
            userId,
        },
        orderBy: {
            creado: "desc"
        },
    });

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Administra tus autos</h2>
                <ButtonAddCar/>
            </div>
            <ListCars autos={car}/>
        </div>
    );
}