import { useMemo, useState } from "react";
import { ObtenerFechaActualMasUno } from "@/constants/Citas";
import { useCitasContext } from "@/context/Citas";
import { useServicioContext } from "@/context/Servicio";
import type { CitaFormProps, Appointment } from "@/types/Citas/types";

interface UseTiempoProps {
    FormCrearCita: CitaFormProps;
    handleChangeCrearCita: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void;
}

export function useTiempo({ handleChangeCrearCita }: UseTiempoProps) {
    const { citas } = useCitasContext();
    const { servicios: ArrayServicios } = useServicioContext();

    const minDate = ObtenerFechaActualMasUno();

    const [fecha, setFecha] = useState<string>(minDate);
    const [hora, setHora] = useState<string>("");

    // Transformar citas a formato necesario (solo cuando citas o servicios cambien)
    const allAppointments: Appointment[] = useMemo(() => {
        return citas
            .map((cita) => {
                const servicio = ArrayServicios.find(
                    (s) => s.titulo === cita.servicio
                );
                if (!servicio) return null;
                return {
                    id: cita.id,
                    fecha: cita.fecha,
                    hora: cita.hora,
                    duration: servicio.duration,
                };
            })
            .filter(Boolean) as Appointment[];
    }, [citas, ArrayServicios]);

    // Manejo del cambio de fecha
    const handleDateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFecha(e.target.value);
        setHora("");
        handleChangeCrearCita(e);
    };

    const handleResetearHora = () => {
        setHora("");
    }

    // Manejo del cambio de hora
    const handleTimeChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
            | { target: { value: string; name: string } }
    ) => {
        setHora(e.target.value);
        handleChangeCrearCita(
            e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        );
    };

    return {
        hora,
        fecha,
        handleDateChange,
        handleTimeChange,
        allAppointments,
        minDate,
        handleResetearHora
    };
}
