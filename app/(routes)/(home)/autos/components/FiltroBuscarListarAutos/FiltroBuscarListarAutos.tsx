"use client"
import { Auto } from "@prisma/client";
import { useEffect, useState } from "react";
import { FiltroBuscarListarAutosProps } from "./FiltroBuscarListarAutos.types";
import { ListarAutos } from "../ListarAutos";
import { FiltrarAutos } from "../FiltrarAutos";

export  function FiltroBuscarListarAutos(props: FiltroBuscarListarAutosProps) {
    const {autos} = props
    const [filteredCars, setFilteredCars] = useState<Auto[]>();
    const [filters, setFilters] = useState({
      tipo: "",
      transmision: "",
      motor: "",
      pasajeros: "",
  });

  useEffect(() => {
    let filtered = autos;

    if (filters.tipo) {
      filtered = filtered.filter((auto) =>
        auto.tipo.toLowerCase().includes(filters.tipo.toLowerCase())
      );
    }
    if (filters.transmision) {
      filtered = filtered.filter((auto) =>
        auto.transmision
          .toLowerCase()
          .includes(filters.transmision.toLowerCase())
      );
    }
    if (filters.motor) {
      filtered = filtered.filter((auto) =>
        auto.motor.toLowerCase().includes(filters.motor.toLowerCase())
      );
    }
    if (filters.pasajeros) {
      filtered = filtered.filter((auto) =>
        auto.pasajeros.toLowerCase().includes(filters.pasajeros.toLowerCase())
      );
    }
    setFilteredCars(filtered);
  }, [filters, autos]);


  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
      tipo: "",
      transmision: "",
      motor: "",
      pasajeros: "",
    });
  };

  return (
    <div>
      <FiltrarAutos
        setFilters={handleFilterChange}
        filters={filters}
        clearFilters={clearFilters}
      />
      <ListarAutos autos={filteredCars}/>
    </div>
  );
}
