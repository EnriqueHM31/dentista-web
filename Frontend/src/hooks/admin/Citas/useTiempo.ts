import { useCitasContext } from "@/context/Citas";
import { useServicioContext } from "@/context/Servicio";
import type { CitaFormProps, Appointment } from "@/types/Citas/types";
import { useEffect, useState } from "react";

interface UseTiempoProps {
    FormCrearCita: CitaFormProps;
    handleChangeCrearCita: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function useTiempo({ FormCrearCita, handleChangeCrearCita }: UseTiempoProps) {

    const { citas } = useCitasContext();
    const { servicios: ArrayServicios } = useServicioContext();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const minDate = tomorrow.toLocaleDateString("en-CA", {
        timeZone: "America/Mexico_City"
    });

    const [fecha, setFecha] = useState<string>(minDate);
    const [hora, setHora] = useState<string>("");

    // Actualiza la duración del servicio al seleccionar
    useEffect(() => {
        const servicioSeleccionado = ArrayServicios.find(
            (s) => s.titulo === FormCrearCita.servicio
        );
        if (servicioSeleccionado) {
            setHora(""); // reset hora al cambiar servicio
        }
    }, [FormCrearCita.servicio, ArrayServicios]);

    // Transformar citas a formato necesario
    const allAppointments: Appointment[] = citas
        .map((cita) => {
            const servicio = ArrayServicios.find((s) => s.titulo === cita.servicio);
            if (!servicio) return null;
            return {
                id: cita.id,
                fecha: cita.fecha,
                hora: cita.hora,
                duration: servicio.duration,
            };
        })
        .filter(Boolean) as Appointment[];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFecha(e.target.value);
        setHora('');
        handleChangeCrearCita(e);
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setHora(e.target.value);
        handleChangeCrearCita(e);
    }

    return {
        hora,
        fecha,
        handleDateChange,
        handleTimeChange,
        allAppointments,
        minDate
    };
}