import { ObtenerFechaActualMasUno } from "@/constants/Citas";
import { useCitasContext } from "@/context/Citas";
import { useServicioContext } from "@/context/Servicio";
import type { CitaFormProps, Appointment } from "@/types/Citas/types";
import { useEffect, useState } from "react";

interface UseTiempoProps {
    FormCrearCita: CitaFormProps;
    handleChangeCrearCita: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function useTiempo({ handleChangeCrearCita }: UseTiempoProps) {

    const { citas } = useCitasContext();
    const { servicios: ArrayServicios } = useServicioContext();

    const minDate = ObtenerFechaActualMasUno();

    const [fecha, setFecha] = useState<string>(minDate);
    const [hora, setHora] = useState<string>("");
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);

    // Transformar citas a formato necesario
    useEffect(() => {
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
        setAllAppointments(allAppointments);
    }, [citas]);



    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFecha(e.target.value);
        setHora('');
        handleChangeCrearCita(e);
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { value: string; name: string } }) => {
        setHora(e.target.value);
        handleChangeCrearCita(e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
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