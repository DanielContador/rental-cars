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

export function ModalAddReservation(props: ModalAddReservationProps) {
  const { auto } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const [confirming, setConfirming] = useState(false); // State to control confirmation dialog

  const autoReservado = async (auto: Auto, dateSelected: DateRange) => {
    const response = await axios.post("/api/checkout", {
      autoId: auto.id,
      precioDia: auto.precioDia,
      ordenInicio: dateSelected.from,
      ordenFin: dateSelected.to,
      nombreAuto: auto.nombre,
    });
    window.location = response.data.url;
    toast({
      title: "Auto reservado ✅",
    });
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
    </AlertDialog>
  );
}
