import { CitasContext } from "@/context/Citas";
import { useEffect, useState } from "react";
import type { CitaProps } from "@/types/Citas/types";
import { getCitas } from "@/services/Citas";

export default function CitasProvider({ children }: { children: React.ReactNode }) {
    const [citas, setCitas] = useState<CitaProps[]>([]);

    useEffect(() => {
        const fetchCitas = async () => {
            const citas = await getCitas();
            setCitas(citas);
        }
        fetchCitas();
    }, []);

    const refrescarCitasCrear = (citas: CitaProps[]) => {
        const nuevasCitas = citas.map((cita) =>
            cita.id === cita.id ? { ...cita, completada: true } : cita
        );
        setCitas(nuevasCitas);
    }

    const refrescarCitasEliminar = (id: `${string}-${string}-${string}-${string}-${string}`) => {
        const nuevasCitas = citas.filter((cita) => cita.id !== id);
        setCitas(nuevasCitas);
    }

    const refrescarCitasCompletar = (citas: CitaProps[], id: `${string}-${string}-${string}-${string}-${string}`) => {
        const nuevasCitas = citas.map((cita) =>
            cita.id === id ? { ...cita, completada: true } : cita

        );
        setCitas(nuevasCitas);
    }

    return <CitasContext.Provider value={{ citas, setCitas, refrescarCitasCrear, refrescarCitasEliminar, refrescarCitasCompletar }}>{children}</CitasContext.Provider>;
}
