"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

export  function FormAddCar() { 
    const [photoUploaded, setphotoUploaded] = useState(false)
  
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
  {
    console.log(values);
  }

  return (
                <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8 bg-white p-6 rounded-lg shadow-lg m-0">
                {/* Eliminamos cualquier margen extra con `m-0` */}
                <div className="grid gap-6 lg:grid-cols-2">

                  {/* primer formfield------------------------- */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre del Auto</FormLabel>
                        <FormControl>
                        <Input placeholder="Nissan v16" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                    

                    
                    )}
                />

                {/* Segundo formfield.................. */}

                <FormField
                    control={form.control}
                    name="hp"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Power</FormLabel>
                        <FormControl>
                        <Input placeholder="150 hp" type="number"{...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

        

                    
                    )}
                />

                {/* tercer formfield--------------- */}

                <FormField
          control={form.control}
          name="transmision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmisión</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de auto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automático</SelectItem>

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* cuarto formfield----------------------------------- */}
        <FormField
          control={form.control}
          name="pasajeros"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pasajeros</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cantidad de pasajeros" />
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

        {/* quinto formfield-------------------------- */}

        <FormField
          control={form.control}
          name="motor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de motor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gasoil">Gasolina</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Eléctrico</SelectItem>
                  <SelectItem value="hybrid">Híbrido</SelectItem>

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* sexto formfield---------------------------- */}

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de vehículo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="sub">Sub</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="familiar">Familiar</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* septimo formfield ---------------*/}

        <FormField
          control={form.control}
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen del auto</FormLabel>
              <FormControl>
                {photoUploaded ?
                <p className="text-sm">Image uploaded</p>
                : (
                  <UploadButton
                  className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                  {...field}
                  endpoint="photo"
                  onClientUploadComplete={(res)=>{
                    form.setValue("foto",res?.[0].url)
  
                    setphotoUploaded(true)
                  }}
                  onUploadError={(error:Error)=>{
                    console.log(error)
                  }}
                  >
  
  
                  </UploadButton>
                )
            }
               

              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
                </div>
                <Button type="submit">Agregar Auto</Button>
            </form>
            </Form>


  );
}
