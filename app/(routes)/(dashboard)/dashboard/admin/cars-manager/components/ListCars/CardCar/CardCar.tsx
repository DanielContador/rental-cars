"use client"
import { Button } from "@/components/ui/button";
import { Fuel , Gauge, Gem, Trash, Upload, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardCarProps } from "./CardCar.type";
import { ButtonEditCar } from "./ButtonEditCar";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"; 
import { useState } from "react";
  
  
export  function CardCar(props: CardCarProps) {
    const { auto } = props;
    const router = useRouter();
    const [confirmingDelete, setConfirmingDelete] = useState(false); 

    const eliminarAuto = async()=>{
        try{
            await axios.delete(`/api/car/${auto.id}`);
            toast({
              title: "Auto eliminado ✅"
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Algo salio mal ❕",
                variant: "destructive"
                })
        }
    };

    const handlerPublicarAuto = async(publicado:boolean) => {
        try{
            await axios.patch(`/api/car/${auto.id}`, {publicado : publicado});
            if(publicado){

            toast({
                title: "Auto publicado ✅"
            })
        }else{
            toast({
                title: "Auto archivado 🔒"
            })
        }
        router.refresh()
        } catch (error) {
            toast({
                title: "Algo salio mal ❕",
                variant: "destructive"
            })
        }
    }

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
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
        Publicado
    </p>
        ) : (
    <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
        No publicado
    </p>
    )}

    <div className="relative p-3"> 
        <div className="flex flex-col mb-3 gap-x-4"> 
            <p className="text-xl min-h-16 lg:min-h-fit">{auto.nombre}</p>
            <p>CLP$ {auto.precioDia} /día</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-4"> 

            <p className="flex items-center">
                <Gem className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.tipo}
            </p>

            <p className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.transmision}
            </p>

            <p className="flex items-center">
                <Users className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.pasajeros}
            </p>

            <p className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.motor}
            </p>

            <p className="flex items-center">
                <Gauge className="h-4 w-4 mr-2" strokeWidth={1}/>
                {auto.hp} HP
            </p>
        </div>

        <div className="flex justify-between mt-3 gap-x-4">
        <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline" onClick={() => setConfirmingDelete(true)}>
      Borrar
      <Trash className="w-4 h-4 ml-2" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
      <AlertDialogDescription>
        ¿Estás seguro de que deseas eliminar este auto?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setConfirmingDelete(false)}>
        Cancelar
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={() => {
          eliminarAuto();
          setConfirmingDelete(false); // Close the dialog after deletion
        }}
      >
        Confirmar
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


            <ButtonEditCar autoData = {auto}/>
        </div>

        {auto.publicado ? ( 
            <Button
                className="w-full mt-3"
                variant="outline"
                onClick={() => handlerPublicarAuto(false)}
            >
                Archivar
                <Upload className="w-4 h-4 ml-2" />
            </Button> 
        ) : ( 
            <Button
            className="w-full mt-3"
            onClick={() => handlerPublicarAuto(true)}
            >
                Publicar
                <Upload className="w-4 h-4 ml-2" />
            </Button>
        )}
    </div>
    </div>
  )
}
