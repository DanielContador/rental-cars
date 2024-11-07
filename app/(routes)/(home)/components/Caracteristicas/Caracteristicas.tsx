import { Icon } from "lucide-react";
import { dataCaracteristicas } from "./Caracteristicas.data"
import { Reveal } from "@/components/Shared/Reveal";

export  function Caracteristicas() {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:py-40">
        <h3 className="text-2xl lg:text-6xl font-bold">Compromiso 👌</h3>
        <p className="max-w-lg mt-5 lg:mt-10 lg:mb-16 text-xl">
            Nos preocupamos por la comodidad y la seguridad de nuestros clientes.
            Por eso, ofrecemos el mejor servicio que pueda imaginar
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
            {dataCaracteristicas.map(({icon: Icon, text, bg, delay}) => (
                <Reveal
                    key={text}
                    className="p-6 rounded-xl hover:shadow-md flex flex-col items-center"
                    position="right"
                    delay={delay}
                >
                    <div className={`rounded-full ${bg} w-fit p-4 flex justify-center`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-center text-xl">{text}</p>
                </Reveal>
            ))}

        </div>
    </div>
  );
}
