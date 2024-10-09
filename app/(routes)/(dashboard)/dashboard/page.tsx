import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { ListCars } from "./components/ListCars";

export default async function DashboardPage() {
  const { userId } = auth()

  if(!userId) {
    return redirect("/");
  }

  const autos = await db.auto.findMany({
    where: {
      publicado : true,
    },
    orderBy: {
      creado: "desc"
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Lista de autos</h2>
      </div>
      <ListCars autos={autos}/>
    </div>
  )
}
