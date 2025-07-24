import { CitasContext } from "@/context/Citas";
import { useContext, useEffect, useState } from "react";
import type { EventClickArg } from '@fullcalendar/core';
import { toast } from "sonner";
import { completarCita, eliminarCita } from "@/services/Citas";

interface Evento {
    id: string;
    title: string;
    start: string;
    backgroundColor: string;
    extendedProps: {
        nombre: string;
        telefono: string;
        email: string;
        comentarios: string;
        servicio: string;
        fecha: string;
        hora: string;
        completada: boolean;
    };
}


export function useCitasCalendario() {

    const [modalOpen, setModalOpen] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);
    const { citas, setCitas } = useContext(CitasContext); // Asegúrate que `setCitas` esté en tu contexto

    const citasFormateadas: Evento[] = citas.map((cita) => ({
        id: cita.id,
        title: `${cita.nombre} - ${cita.servicio}`,
        start: `${cita.fecha.substring(0, 10)}T${cita.hora}`,
        backgroundColor: cita.completada ? "#22c55e" : "#3B82F6", // Verde si está completada
        extendedProps: {
            nombre: cita.nombre,
            telefono: cita.telefono,
            email: cita.email,
            comentarios: cita.comentarios,
            servicio: cita.servicio,
            fecha: cita.fecha,
            hora: cita.hora,
            completada: cita.completada,
        },
    }));

    useEffect(() => {
        const ahora = new Date();
        citas.forEach(async (cita) => {
            if (cita.completada) return;

            const fechaCita = new Date(`${cita.fecha}T${cita.hora}`);

            if (fechaCita < ahora) {
                // Marcar como completada
                const { success, message } = await completarCita(cita.id as `${string}-${string}-${string}-${string}-${string}`);
                if (success) {
                    const nuevasCitas = citas.map((cita) =>
                        cita.id === cita.id ? { ...cita, completada: true } : cita
                    );
                    setCitas(nuevasCitas);
                    toast.success(message);
                } else {
                    toast.error("Error al completar la cita");
                }
            }
        });
    }, [citas]);

    const handleEventClick = (info: EventClickArg) => {
        const { id, title, start, backgroundColor, extendedProps } = info.event;

        setEventoSeleccionado({
            id,
            title,
            start: start?.toString() || '',
            backgroundColor: backgroundColor || "#3B82F6",
            extendedProps: {
                nombre: extendedProps.nombre,
                telefono: extendedProps.telefono,
                email: extendedProps.email,
                comentarios: extendedProps.comentarios,
                servicio: extendedProps.servicio,
                fecha: extendedProps.fecha,
                hora: extendedProps.hora,
                completada: extendedProps.completada,
            },
        });

        setModalOpen(true);
    };

    const onClose = () => {
        setModalOpen(false);
        setEventoSeleccionado(null);
    };

    const onCitaCompletada = async (id: string) => {

        const { success, message } = await completarCita(id as `${string}-${string}-${string}-${string}-${string}`);
        if (success) {
            const nuevasCitas = citas.map((cita) =>
                cita.id === id ? { ...cita, completada: true } : cita
            );
            setCitas(nuevasCitas);
            setModalOpen(false);
            toast.success(message);
            setEventoSeleccionado(null);
        } else {
            toast.error("Error al completar la cita");
        }


    };

    const onCitaEliminada = async (id: string) => {

        const { success, message } = await eliminarCita(id as `${string}-${string}-${string}-${string}-${string}`);
        if (success) {
            const nuevasCitas = citas.filter((cita) => cita.id !== id);
            setCitas(nuevasCitas);
            toast.success(message);
            setModalOpen(false);
        } else {
            toast.error("Error al eliminar la cita");
        }
    };

    return {
        citasFormateadas,
        modalOpen,
        eventoSeleccionado,
        handleEventClick,
        onClose,
        onCitaCompletada,
        onCitaEliminada,
    };
}