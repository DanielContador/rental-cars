export type FiltrarAutosProps = {
    setFilters: (filterName: string, filterValue: string) => void;
    clearFilters: () => void;

    filters: {
        tipo:string,
        transmision:string,
        motor:string,
        pasajeros:string,
    }
}