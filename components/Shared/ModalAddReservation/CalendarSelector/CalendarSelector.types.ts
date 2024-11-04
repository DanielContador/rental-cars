export type  CalendarSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
    setDateSelected: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
>;
autoPrecioDia: string;
reservedDates: { ordenInicio: string; ordenFin: string }[]; 
}