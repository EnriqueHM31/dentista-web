import { getServicios, getServiciosDisponibles } from "@/services/Servicios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ServicioContext } from "@/context/Servicio";
import type { ServicioProps } from "@/types/Servicios/types";
import type { UUID } from "@/types/types";

export const ServicioProvider = ({ children }: { children: React.ReactNode }) => {
    const [servicios, setServicios] = useState<ServicioProps[]>([]);
    const [serviciosDisponibles, setServiciosDisponibles] = useState<ServicioProps[]>([]);

    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        try {
            const [serviciosRes, disponiblesRes] = await Promise.all([
                getServicios(),
                getServiciosDisponibles(),
            ]);

            if (!serviciosRes.success || !serviciosRes.servicios) {
                toast.error(serviciosRes.message);
                return
            }
            setServicios(ordenarServicios(serviciosRes.servicios));

            if (!disponiblesRes.success || !disponiblesRes.servicios) {
                toast.error(disponiblesRes.message);
            }
            setServiciosDisponibles(ordenarServicios(disponiblesRes.servicios));

        } catch {
            toast.error("Error al cargar datos");
        }
    };

    const ordenarServicios = (servicios: ServicioProps[]) => {
        return servicios.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    const refrescarServiciosCrear = (servicioCreado: ServicioProps) => {
        setServicios(prev => ordenarServicios([...prev, servicioCreado]));
    }

    const refrescarServiciosEditar = (servicioSeleccionado: Partial<ServicioProps>, id: UUID) => {
        setServicios(prev => ordenarServicios(prev.map(s => s.id === id ? { ...s, ...servicioSeleccionado } : s)));
    }

    const refrescarServiciosEliminar = (id: UUID) => {
        setServicios(prev => prev.filter(s => s.id !== id));
    }

    const refrescarServiciosDisponiblesAñadir = (servicioEliminado: ServicioProps) => {
        setServiciosDisponibles(prev => [...prev, servicioEliminado]);
    }

    const refrescarServiciosDisponiblesEliminar = (id: UUID) => {
        setServiciosDisponibles(serviciosDisponibles.filter(servicio => servicio.id !== id));
    }

    return (
        <ServicioContext.Provider value={{
            servicios, setServicios, serviciosDisponibles, setServiciosDisponibles, refrescarServiciosCrear, refrescarServiciosEditar, refrescarServiciosEliminar, refrescarServiciosDisponiblesAñadir, refrescarServiciosDisponiblesEliminar
        }}>
            {children}
        </ServicioContext.Provider>
    );
};