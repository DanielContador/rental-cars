"use client"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import { dataLogos } from "./SliderLogo.data";
import { Reveal } from "@/components/Shared/Reveal";
  
export  function SliderLogo() {
  return (
    <Reveal position="bottom" className="flex gap-x-20 justify-center lg:pb-20 mt-5 mb-10">
        <Carousel
            className="w-full max-w-6xl mx-auto"
            plugins={[
                Autoplay({
                    delay: 2500,
                }),
            ]}
        >
            <CarouselContent>
                {dataLogos.map(({url}) => (
                    <CarouselItem key={url}
                    className="bassis-4/4 md:basis-2/4 lg:basis-1/6"
                    >
                        <Image src={`/images/logos/${url}`} alt="Brand" width={90} height={90} className="object-contain aspect-[3/2]" />
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    </Reveal>
  )
}