"use client"
import { Button } from "@/components/ui/button"
import { Fuel, Gem, Heart, Users, Wrench, Gauge } from "lucide-react"
import Image from "next/image"
import { useLovedCars } from "@/hooks/use-loved-cars"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Auto } from "@prisma/client"
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation"
import { ListarAutosProps } from "./ListarAutos.types"
import { SkeletonAutos } from "@/components/Shared/SkeletonAutos"

export  function ListarAutos(props: ListarAutosProps) {
    const { autos } = props;
    const { userId } = useAuth();
    const { addLoveItem, lovedItems, removeLovedItem } = useLovedCars();

    if (!autos) {
        return <SkeletonAutos/>
    }

  return (
    <>
      {autos.length === 0 && (
        <p>No se han encontrado vehículos con estos filtros</p>
      )}
      <div className="grid  md:grid-cols-2 gap-6 lg:grid-cols-4">
        {autos.map((auto: Auto) => {
          const {
            precioDia,
            foto,
            nombre,
            tipo,
            transmision,
            pasajeros,
            motor,
            hp,
            id,
          } = auto;
          const likedCar = lovedItems.some((item) => item.id === auto.id);

          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
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
                  <p>CLP$ {precioDia} /día</p>
                </div>
                <p className="flex items-center">
                  <Gem className="w-4 h-4 mr-2" strokeWidth={1} />
                  {tipo}
                </p>
                <p className="flex items-center">
                  <Wrench className="w-4 h-4 mr-2" strokeWidth={1} />
                  {transmision}
                </p>
                <p className="flex items-center">
                  <Users className="w-4 h-4 mr-2" strokeWidth={1} />
                  {pasajeros}
                </p>
                <p className="flex items-center">
                  <Fuel className="w-4 h-4 mr-2" strokeWidth={1} />
                  {motor}
                </p>
                <p className="flex items-center">
                  <Gauge className="w-4 h-4 mr-2" strokeWidth={1} />
                  {hp} HP
                </p>

                {userId ? (
                  <div className="flex items-center justify-center gap-x-3">
                    <ModalAddReservation auto={auto} />
                    <Heart
                      className={`mt-2 cursor-pointer ${
                        likedCar && "fill-black"
                      }`}
                      onClick={
                        likedCar
                          ? () => removeLovedItem(auto.id)
                          : () => addLoveItem(auto)
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">
                        Inicia sesión para reservar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}
