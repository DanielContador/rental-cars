import { Calendar, Car, Heart, ListCollapse} from "lucide-react"

export const dataGeneralSidebar  = [
    {
        icon : Car,
        label: "Autos",
        href: "/dashboard"
    },
    {
        icon : Calendar,
        label: "Reserva de autos",
        href: "/reserves"
    },
    {
        icon : Heart,
        label: "Autos de interes",
        href: "/loved-cars"
    },
]

export const dataAdminSidebar = [
    {
        icon : ListCollapse,
        label: "Administra tus autos",
        href: "/dashboard/admin/cars-manager"
    },
    {
        icon : Calendar,
        label: "Todas las reservas",
        href: "/dashboard/admin/all-reserves"  
    },
]
