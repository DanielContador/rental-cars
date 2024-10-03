"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { FormAddCar } from "../FormAddCar/FormAddCar"
  
export  function ButtonAddCar() {
    const [openDialog, setOpenDialog] = useState(false)
  return (
    <Dialog open={openDialog}>
        <DialogTrigger asChild>
            <Button variant={"outline"} onClick={() => setOpenDialog(true)}>
                Agregar nuevo auto
                <PlusCircle className="ml-2 bg-white"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    <FormAddCar/>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
