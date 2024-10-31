"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormAddCar.form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import { FormAddCarProps } from "./FormAddCar.types"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export  function FormAddCar(props : FormAddCarProps) { 
    const {setOpenDialog} = props
    const [photoUploaded, setphotoUploaded]  = useState(false)
    const router = useRouter();
  
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      hp: "",
      transmision: "",
      pasajeros: "",
      foto: "",
      motor: "",
      precioDia: "",
      tipo: "",
      publicado: false
    },
  })
 
  const onSubmit = async(values: z.infer<typeof formSchema>) =>
  { setOpenDialog(false)
    try{
      await axios.post('/api/car', values);
      toast({
        title: "Auto agregado ✅"
      })
      router.refresh();
    } catch (error) {
        toast({
          title: "Algo salio mal ❕",
          variant: "destructive"
          })
    }
  };

  const {isValid} = form.formState

  return (
    <div className="relative">
    {/* Copy this button to close the dialog */}
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={() => setOpenDialog(false)}  // <-- Copy this line
    >
      &times; {/* Close icon (cross) */}
    </button>
    
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-8"
        >
        {/* Grid para organizar los campos */}
        <div className="grid gap-6 lg:grid-cols-2 ">
  
          {/* Primer FormField */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo del Auto</FormLabel>
                <FormControl>
                  <Input placeholder="Modelo de auto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Segundo FormField */}
          <FormField
            control={form.control}
            name="hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caballos de fuerza</FormLabel>
                <FormControl>
                  <Input placeholder="150 HP" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Resto de los campos */}
          {/* Tercer FormField: Transmisión */}
          <FormField
            control={form.control}
            name="transmision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmisión</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de transmision" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatico">Automático</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Cuarto FormField: Pasajeros */}
          <FormField
            control={form.control}
            name="pasajeros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasajeros</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cantidad de pasajeros" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Quinto FormField: Motor */}
          <FormField
            control={form.control}
            name="motor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de motor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Petrolero">Diesel</SelectItem>
                    <SelectItem value="Electrico">Eléctrico</SelectItem>
                    <SelectItem value="Hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Sexto FormField: Tipo */}
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de vehículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Suv">Suv</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Séptimo FormField: Imagen */}
          <FormField
            control={form.control}
            name="foto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen del auto</FormLabel>
                <FormControl>
                  {photoUploaded ? (
                    <p className="text-sm">Imagen cargada</p>
                  ) : (
                    <UploadButton
                      className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                      {...field}
                      endpoint="photo"
                      onClientUploadComplete={(res) => {
                        form.setValue("foto", res?.[0].url);
                        setphotoUploaded(true);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

  
          {/* Sexto FormField: Tipo */}
          <FormField
            control={form.control}
            name="precioDia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio por dia</FormLabel>
                <FormControl>
                  <Input placeholder="$20.000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
        </div>
        <Button type="submit" className="w-full mt-5" disabled={!isValid}>
          Agregar Auto
        </Button>
      </form>
  </Form>

  </div>
);
  
}
