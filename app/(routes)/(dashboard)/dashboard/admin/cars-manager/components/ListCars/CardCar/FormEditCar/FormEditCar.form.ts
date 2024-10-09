import { z } from "zod"

export const formSchema = z.object({
    nombre: z.string().min(2).max(50),
    hp: z.string().min(2).max(50),
    transmision: z.string().min(2).max(50),
    pasajeros: z.string().min(1).max(50),
    foto: z.string().min(2).max(100),
    precioDia: z.string().min(2).max(50),
    motor: z.string().min(2).max(50),
    tipo: z.string().min(2).max(50),
    publicado: z.boolean(),

  });
