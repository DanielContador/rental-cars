import * as React from 'react'
import { Select, 
    SelectContent,
     SelectGroup,
      SelectItem,
       SelectLabel,
        SelectTrigger
        , SelectValue } from '@/components/ui/select'
import { FiltrarAutosProps } from './FiltrarAutos.types'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

export  function FiltrarAutos(props: FiltrarAutosProps) {
    const { clearFilters, setFilters, filters } = props;

    const handleFilter = (filter: string, value: string) => {
        setFilters(filter, value);
    };

  return (
    <div className='mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5'>
        <Select onValueChange={(value) => handleFilter("tipo", value)} value={filters.tipo}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder="Tipo de auto"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tipo de auto</SelectLabel>
                        <SelectItem value="sedan">Sedán</SelectItem>
                        <SelectItem value="suv">Suv</SelectItem>
                        <SelectItem value="coupe">Coupé</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => handleFilter("transmision", value)} value={filters.transmision}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder="Cambio de marchas"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cambio de marchas</SelectLabel>
                        <SelectItem value="automatico">Automatico</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilter("motor", value)} value={filters.motor}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder="Tipo de motor"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tipo de motor</SelectLabel>
                        <SelectItem value="gasolina">Gasolina</SelectItem>
                        <SelectItem value="petrolero">Petrolero</SelectItem>
                        <SelectItem value="electrico">Electrico</SelectItem>
                        <SelectItem value="hibrido">Hibrido</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilter("pasajeros", value)} value={filters.pasajeros}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder="Personas"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Personasr</SelectLabel>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
      
    <Button onClick={clearFilters}>
        Remover filtros <Trash className='w-4 h-4 ml-2'></Trash>
    </Button>
    </div>
  )
}
