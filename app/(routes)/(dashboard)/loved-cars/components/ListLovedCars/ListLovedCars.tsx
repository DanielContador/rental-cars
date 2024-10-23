"use client"
import { useLovedCars } from "@/hooks/use-loved-cars"
import { Auto } from "@prisma/client"
import { Fuel,Gem, Heart, Users, Wrench, Gauge  } from "lucide-react"
import Image from "next/image"
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation"

export  function ListLovedCars() {
    const {lovedItems, removeLovedItem} = useLovedCars()

  return (
    <>
    {lovedItems.length === 0 ? (
        <h2>Aún no dispones de autos que te gusten</h2>
    ):(
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {lovedItems.map((auto: Auto) => {
                const {precioDia, foto, nombre, tipo, transmision, pasajeros, motor, hp, id} = auto

                return (
                    <div className="p-1 rounded-lg shadow-md hover:shadow-lg"
                    key={id}
                    >
                        <Image  
                            src={foto}
                            alt=""
                            width={400}
                            height={600}
                            className="rounded-lg"
                        />
                        <div className="p-3">
                            <div className="flex flex-col mb-3 gap-x-4">
                                <p className="text-xl min-h-16 lg:min-h-fit">{nombre}</p>
                                <p>${precioDia} /dia</p>
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
                        <p className="flex items-center">
                            <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
                            {hp} HP
                        </p>

                        <div className="flex items-center justify-center gap-x-3">
                            <ModalAddReservation auto={auto} />
                            <Heart className="mt-2 cursor-pointer fill-black" 
                            onClick={() => removeLovedItem(auto.id)}
                            />
                        </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )}
    </>
  )
}
