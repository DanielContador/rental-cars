import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TableReservesProps } from "./TableReserves.types";
  import { formatoPrecio } from "@/lib/formatoPrecio";
  
  export function TableReserves(props: TableReservesProps) {
    const { ordenes } = props;
  
    const montoTotal = ordenes.reduce((acc, booking) => {
      return acc + parseFloat(booking.montoTotal);
    }, 0);
  
    return (
      <Table>
        <TableCaption>Lista de todas las reservas de autos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha de orden</TableHead>
            <TableHead>ID usuario</TableHead>
            <TableHead>Auto</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordenes.map((orden) => (
            <TableRow key={orden.id}>
              <TableCell className="font-medium">
                {new Date(orden.creado).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="font-medium max-w-[100px] truncate">
                {orden.userId}
              </TableCell>
              <TableCell className="font-medium truncate">
                {orden.nombreAuto}
              </TableCell>
              <TableCell>
                {new Date(orden.ordenInicio).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(orden.ordenFin).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                {formatoPrecio(Number(orden.montoTotal))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {formatoPrecio(montoTotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }