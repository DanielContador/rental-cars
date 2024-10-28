"use client"
import Image from "next/image";
import { Reveal } from "@/components/Shared/Reveal";

export  function FirtsBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-4xl lg:text-8xl font-bold">
            Alquiler
        <span className="block"> premium, </span>
            de autos en la 
            5ta region
        </h1>
        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
                No te resistas al placer de conducir los mejores autos 
                que RentalCars te pueda ofrecer, renta tu auto aqui y ahora
        </p>
      </Reveal>  
      
        <div className="flex justify-end">
            <Image
            src="/images/autonegro.png"
            alt="Rental Cars"
            width={800}
            height={800}
            priority />
        </div>

    </div>
  )
}
