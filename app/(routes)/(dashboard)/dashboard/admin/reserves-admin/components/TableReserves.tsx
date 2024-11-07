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
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order Date</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Date Start</TableHead>
          <TableHead>Date End</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordenes.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              {new Date(order.creado).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="font-medium max-w-[100px] truncate">
              {order.userId}
            </TableCell>
            <TableCell className="font-medium truncate">
              {order.nombreAuto}
            </TableCell>
            <TableCell>
              {new Date(order.ordenInicio).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>
              {new Date(order.ordenFin).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              {formatoPrecio(Number(order.montoTotal))}
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