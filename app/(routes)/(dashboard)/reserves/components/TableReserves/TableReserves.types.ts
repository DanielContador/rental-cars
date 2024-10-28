import { Orden } from "@prisma/client"

export type TableReservesProps = {
    ordenes: Orden[];
}