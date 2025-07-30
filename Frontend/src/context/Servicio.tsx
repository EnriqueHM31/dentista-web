import type { ServicioContextType } from "@/types/Servicios/types";
import { createContext, useContext } from "react";

export const ServicioContext = createContext<ServicioContextType>({
    servicios: [],
    setServicios: () => { },
    serviciosDisponibles: [],
    setServiciosDisponibles: () => { },
    refrescarServiciosCrear: () => { },
    refrescarServiciosEditar: () => { },
    refrescarServiciosEliminar: () => { },
    refrescarServiciosDisponiblesAñadir: () => { },
    refrescarServiciosDisponiblesEliminar: () => { },
});

export function useServicioContext() {
    const {
        servicios, setServicios, serviciosDisponibles, setServiciosDisponibles, refrescarServiciosCrear, refrescarServiciosEditar, refrescarServiciosEliminar, refrescarServiciosDisponiblesAñadir, refrescarServiciosDisponiblesEliminar }
        = useContext(ServicioContext);
    return { servicios, setServicios, serviciosDisponibles, setServiciosDisponibles, refrescarServiciosCrear, refrescarServiciosEditar, refrescarServiciosEliminar, refrescarServiciosDisponiblesAñadir, refrescarServiciosDisponiblesEliminar };
}


