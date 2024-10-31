import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Auto } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ClipLoader } from "react-spinners"; //
export function ModalAddReservation(props: ModalAddReservationProps) {
  const { auto } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const [confirming, setConfirming] = useState(false); // State for confirmation dialog
  const [loading, setLoading] = useState(false); // State for loading animation

  const autoReservado = async (auto: Auto, dateSelected: DateRange) => {
    setLoading(true); // Set loading to true
    try {
    // Guardar todos los datos de la orden en sessionStorage
    // Store each property separately in sessionStorage
    sessionStorage.setItem("autoId", auto.id);
    sessionStorage.setItem("precioDia", auto.precioDia.toString());

      // Check if dateSelected.from and dateSelected.to are defined
      const startDate = dateSelected.from ? dateSelected.from.toISOString() : new Date().toISOString();
      const endDate = dateSelected.to ? dateSelected.to.toISOString() : new Date().toISOString();
      
      sessionStorage.setItem("ordenInicio", startDate);
      sessionStorage.setItem("ordenFin", endDate);
    sessionStorage.setItem("nombreAuto", auto.nombre);
      const response = await axios.post("/api/checkout", {
        autoId: auto.id,
        precioDia: auto.precioDia,
        ordenInicio: dateSelected.from,
        ordenFin: dateSelected.to,
        nombreAuto: auto.nombre,
      });
      window.location = response.data.url;
      toast({
        title: "Orden creada ✅",
      });
    } catch (error) {
      toast({
        title: "Error al reservar el auto ❕",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state after process
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full mt-3">
          Reservar auto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Selecciona las fechas en las que quieres arrendar el auto
          </AlertDialogTitle>
          <AlertDialogDescription>
            <CalendarSelector
              setDateSelected={setDateSelected}
              autoPrecioDia={auto.precioDia}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setConfirming(true)} // Open confirmation dialog
          >
            Reservar auto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Reserva</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas reservar el auto?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirming(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                autoReservado(auto, dateSelected);
                setConfirming(false); // Close confirmation dialog
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Loading Animation */}
      {loading && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-gray-100 p-4 rounded shadow-lg flex flex-col items-center"> {/* Set a solid background color and size */}
      <ClipLoader color="#000000" loading={loading} size={50} />
      <p className="text-black mt-2">Cargando, por favor espera...</p>
    </div>
  </div>
)}

    </AlertDialog>
  );
}
