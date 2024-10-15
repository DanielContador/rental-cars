"use client"
import Image from "next/image";

export  function FirtsBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center">
        <h1 className="text-4xl lg:text-8xl font-bold">
            Alquiler
        <span> premium, </span>
            de autos en la 
            5ta region
        </h1>
        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
                No te resistas al placer de conducir los mejores autos 
                que RentalCars te pueda ofrecer, renta tu auto aqui y ahora
        </p>
      
        <div>
            <Image
            src="/public/images/autonegro.png"
            alt="Rental Cars"
            width={800}
            height={800}
            priority />
        </div>

    </div>
  )
}
