import { Navbar } from "@/components/Shared/Navbar"
import { db } from "@/lib/db"
import { HeaderAuto } from "./components/HeaderAuto";
import { FiltroBuscarListarAutos } from "./components/FiltroBuscarListarAutos";

export default async function page() {
    const autos = await db.auto.findMany({
        where: {
            publicado: true,
        },
        orderBy: {
            creado: "desc",
        },
    });


  return (
    <div>
        <Navbar/>
        <div className="p-6 mx-auto max-w-7xl">
            <HeaderAuto/>
            <div>
                <FiltroBuscarListarAutos autos={autos}/>
            </div>
        </div>
    </div>
  )
}
