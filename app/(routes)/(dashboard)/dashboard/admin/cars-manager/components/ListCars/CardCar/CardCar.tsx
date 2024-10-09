"use client"
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { Fuel , Gauge, Gem, Trash, Upload, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardCarProps } from "./CardCar.type";
import { ButtonEditCar } from "./ButtonEditCar";

export  function CardCar(props: CardCarProps) {
    const { auto } = props;

  return ( 
  <div className="relative p-3 bg-white rounded-lg shadow-md hover:shadow">
    <Image 
        src={auto.foto}
        alt={auto.nombre}
        width={400}
        height={600}
        className="rounded-lg"
    />
    {auto.publicado ? (
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700">
        Publicado
    </p>
        ) : (
    <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-red-300">
        No publicado
    </p>
    )}

    <div className="relative p-3"> 
        <div className="felx flex-col mb-3 gap-x-4"> 
            <p className="text-xl min-h-16 lg:min-h-fit">{auto.nombre}</p>
            <p>$ {auto.precioDia} /dia</p>
        </div>

        <div className="felx flex-col mb-3 gap-x-4"> 

            <p className="flex items-between">
                <Gem className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.tipo}
            </p>

            <p className="flex items-between">
                <Wrench className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.transmision}
            </p>

            <p className="flex items-between">
                <Users className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.pasajeros}
            </p>

            <p className="flex items-between">
                <Fuel className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.motor}
            </p>

            <p className="flex items-between">
                <Gauge className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.hp} HP
            </p>
        </div>

        <div className="flex justify-between mt-3 gap-x-4">
            <Button variant="outline" onClick={() => console.log("delete")}>
                Borrar
                <Trash className="w-4 h-4 ml-2" />
            </Button>

            <ButtonEditCar autoData = {auto}/>
        </div>

        {auto.publicado ? ( 
            <Button
                className="w-full mt-3"
                variant="outline"
                onClick={()=> console.log("Despublicado")}
            >
                Despublicar
                <Upload className="w-4 h-4 ml-2" />
            </Button> 
        ) : ( 
            <Button
            className="w-full mt-3"
            onClick={() => console.log("Publicado")}
            >
                Publicar
                <Upload className="w-4 h-4 ml-2" />
            </Button>
        )}
    </div>
    </div>
  )
}
