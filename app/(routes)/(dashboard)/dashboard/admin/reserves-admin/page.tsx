import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";

export default async function pageReservesAdmin() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user ) {
    return redirect("/");
  }

  const ordenes = await db.orden.findMany({
    where: {
      estado: "confirmed", // Agrega esta condición para filtrar por estado
    },
    orderBy: {
      creado: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-3xl mb-4">Todas las reservas</h1>

      <TableReserves ordenes={ordenes} />
    </div>
  );
}