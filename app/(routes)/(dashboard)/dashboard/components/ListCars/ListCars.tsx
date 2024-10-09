import { Auto } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";

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
            </div>
        )
    })}
  </div>
  )
}
