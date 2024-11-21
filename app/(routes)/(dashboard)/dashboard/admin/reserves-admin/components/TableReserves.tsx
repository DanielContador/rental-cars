"use client";
import axios from "axios"; // Asegúrate de importar axios
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableReservesProps } from "./TableReserves.types";
import { formatoPrecio } from "@/lib/formatoPrecio";

export function TableReserves(props: TableReservesProps) {
  const { ordenes } = props;

  // Estado para los nombres de los usuarios y el estado de carga
  const [users, setUsers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true); 

  // UseEffect para hacer la llamada a la API cuando las ordenes cambien
  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = ordenes.map(order => order.userId).join(",");  // Extraer los userIds de las ordenes

      try {
        // Usamos axios para hacer la solicitud GET
        const response = await axios.get(`/api/getUserNames?userIds=${userIds}`);
        setUsers(response.data); // Guardamos los nombres de usuario
        setLoading(false); // Establecemos el estado de carga como false
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Aseguramos que el estado de carga se apague, incluso en caso de error
      }
    };

    if (ordenes.length > 0) {
      fetchUserNames(); // Solo hacemos la llamada si hay ordenes
    }
  }, [ordenes]); // El useEffect se ejecuta cada vez que cambian las ordenes

  // Calcular el monto total de todas las ordenes
  const montoTotal = ordenes.reduce((acc, booking) => acc + parseFloat(booking.montoTotal), 0);

  return (
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha de Orden</TableHead>
          <TableHead>Nombre de usuario</TableHead> 
          <TableHead>Auto</TableHead>
          <TableHead>Fecha inicio</TableHead>
          <TableHead>Fecha fin</TableHead>
          <TableHead className="text-right">Monto</TableHead>
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
              {/* Mostrar el nombre del usuario o "Loading..." mientras se carga */}
              {loading ? "Loading..." : users[order.userId] || "Unknown User"}
            </TableCell>
            <TableCell className="font-medium truncate">{order.nombreAuto}</TableCell>
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
