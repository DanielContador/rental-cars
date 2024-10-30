import { Navbar } from "@/components/Shared/Navbar";
import { FirtsBlock } from "./components/FirtsBlock";
import { SliderLogo } from "./components/SliderLogo";
import { Caracteristicas } from "./components/Caracteristicas";
import { OurFleet } from "./components/OurFleet";
import { ManejaHoy } from "./components/ManejaHoy"

export default function Home() {
  return (
    <div>
    <Navbar/>
    <FirtsBlock/>
    <SliderLogo/>
    <Caracteristicas/>
    <OurFleet/>
    <ManejaHoy/>
    </div>
  );
}
