"use client"
import { Auto } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";
import { Fuel, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";

export  function ListCars(props: ListCarsProps) {
    const {autos} = props;

  return (
  <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
    {autos.map(( auto : Auto) => {
        const { 
            precioDia , 
            foto , 
            hp, 
            motor, 
            id, 
            nombre,
            pasajeros, 
            transmision, 
            tipo} = auto;

        return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
                <Image
                    src={foto}
                    alt={nombre}
                    width={400}
                    height={600}
                    className="rounded-lg"
                />
                <div className="p-3">
                    <div className="flex flex-col mb-3 gap-x-4">
                        <p className="text-xl min-h-16 lg:min-h-fit">{nombre}</p>
                        <p>CLP$ {precioDia} /dia</p>
                    </div> 
                        <p className="flex items-center">
                            <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
                            {tipo}
                        </p>
                        <p className="flex items-center">
                            <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
                            {transmision}
                        </p>
                        <p className="flex items-center">
                            <Users className="h-4 w-4 mr-2" strokeWidth={1} />
                            {pasajeros}
                        </p>
                        <p className="flex items-center">
                            <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
                            {motor}
                        </p> 

                        <div className="flex items-center justify-center gap-x-3">
                            <ModalAddReservation auto={auto}/>
                            <Heart className="mt-2 cursor-pointer " 
                            onClick={() => console.log("HEART")}
                            />
                        </div>   
                </div>
            </div>
        );
    })}
  </div>
  )
}