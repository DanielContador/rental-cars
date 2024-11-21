import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableReservesProps } from "./TableReserves.types"
import { formatoPrecio } from "@/lib/formatoPrecio";

export  function TableReserves(props: TableReservesProps) {

  const {ordenes} = props;

  const montoTotal = ordenes.reduce((acc, booking) => {
    return acc + parseFloat(booking.montoTotal);
  }, 0);

  return (
    <Table>
      <TableCaption>Lista de reservas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Autos</TableHead>
          <TableHead>Fecha Inicio</TableHead>
          <TableHead>Fecha Fin</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordenes.map((orden)=>(
          <TableRow key={orden.id}>
            <TableCell className="font-medium">{orden.nombreAuto}</TableCell>
            <TableCell>
              {new Date(orden.ordenInicio).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(orden.ordenFin).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="p-2 text-white bg-green-600 rounded-lg w-fit">
                {orden.estado}
              </div>
            </TableCell>
            <TableCell className="text-right">{formatoPrecio(Number(orden.montoTotal))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{formatoPrecio(montoTotal)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

  )
} 
