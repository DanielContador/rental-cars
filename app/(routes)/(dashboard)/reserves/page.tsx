import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { TableReserves } from "./components/TableReserves"


export default async function pageReserves() {
    const {userId} = auth()

    if(!userId) {
        return redirect("/")
    }

    const ordenes = await db.orden.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            creado: "desc",
        },
    });

  return (
    <div>
      <h1 className="mb-4 text-3xl">Pagina de reservas</h1>
      {ordenes.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 items-center">
            <h2 className="text-xl"> No tienes ninguna reserva hecha </h2>
            <p>Realiza tus reservas en la pagina de autos</p>
            <Link href="/autos">
              <Button>Lista de autos</Button>
            </Link>
        </div>
      ):(
        <TableReserves ordenes={ordenes}/>
      )}
    </div>
  )
}
