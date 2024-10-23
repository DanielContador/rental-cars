import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from './use-toast'
import { Auto } from '@prisma/client'

interface UseLovedCarsType {
    lovedItems: Auto[],
    addLoveItem: (data: Auto) => void,
    removeLovedItem: (id: string) => void
}

export const useLovedCars = create (
    persist<UseLovedCarsType>(
        (set,get) => ({
            lovedItems: [],
            addLoveItem: (data: Auto) => {
                const currentLovedItems = get().lovedItems;
                const existingItem = currentLovedItems.find((item) => item.id == data.id)

                if(existingItem) {
                    return toast({
                        title: "El auto ya esta agregado ❗"
                    });
                }
                
            set({
                lovedItems: [...get().lovedItems, data]
            })

            toast({
                title: "Auto agregado ✅"
            })
        },
        
        removeLovedItem: (id: string) => {
            set({
                lovedItems: [...get().lovedItems.filter((item) => item.id !== id)]
            })
            toast({
                title: "El auto se elimino ❌"
            })
        }
    }),
    {
        name: "loved-products-storage",
        storage: createJSONStorage (()=> localStorage)  
    }
    ) 
)