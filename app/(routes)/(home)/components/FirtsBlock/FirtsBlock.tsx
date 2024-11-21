"use client"
import Image from "next/image";
import { Reveal } from "@/components/Shared/Reveal";

export  function FirtsBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold">
            Renta tu auto!
        <span className="block">Rental Cars</span>
        </h1>
        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
                No te resistas al placer de conducir los mejores autos 
                que RentalCars te pueda ofrecer, renta tu auto aquí y ahora
        </p>
      </Reveal>  
      
        <Reveal className="flex justify-end" position="right">
            <Image
            src="/images/autonegro.png"
            alt="Rental Cars"
            width={600}
            height={600}
            priority />
        </Reveal>

    </div>
  )
}
