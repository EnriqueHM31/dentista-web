import { useCitasContext } from "@/context/Citas";
import { useEffect, useState } from "react";
import type { EventClickArg } from '@fullcalendar/core';
import { toast } from "sonner";
import { aceptarCita, completarCita, eliminarCita } from "@/services/Citas";
import type { CitasCalendarioProps } from "@/types/Citas/types";
import type { UUID } from "@/types/types";
import { formatearHora, verificacionFechaHora } from "@/utils/Hora";

export function useCitasCalendario() {

    const [modalOpen, setModalOpen] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState<CitasCalendarioProps | null>(null);
    const { citas, refrescarCitasCompletar, refrescarCitasEliminar, refrescarCitasCrear, refrescarCitasAceptar } = useCitasContext();


    const citasFormateadas: CitasCalendarioProps[] = citas.map((cita) => {
        console.log(formatearHora(cita.hora));
        return {
            id: cita.id,
            title: `${cita.nombre} - ${cita.servicio}`,
            start: `${cita.fecha.substring(0, 10)}T${formatearHora(cita.hora)}`,
            backgroundColor: cita.completada ? "#22c55e" : "#3B82F6",
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
        };
    });

    useEffect(() => {
        const ahora = new Date();

        citas.forEach(async (cita) => {
            if (cita.completada) return;

            // Combinar fecha y hora en un solo objeto Date
            const fechaHoraCita = verificacionFechaHora({ hora: cita.hora, fecha: cita.fecha });

            // Solo completar si la fecha-hora ya pasó
            if (fechaHoraCita < ahora) {
                const { success, message } = await completarCita(cita.id);
                if (success) {
                    refrescarCitasCrear(citas);
                    toast.success(message || "La cita se completó correctamente");
                } else {
                    toast.error("Error al completar la cita");
                }
            }
        });
    }, [citas]);

    const handleEventClick = (info: EventClickArg) => {
        const { id, title, start, backgroundColor, extendedProps } = info.event;

        setEventoSeleccionado({
            id: id as UUID,
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

    const onCitaCompletada = async ({ id }: { id: UUID }) => {

        const { success, message } = await completarCita(id);
        if (success) {
            refrescarCitasCompletar(citas, id);
            setModalOpen(false);
            toast.success(message || "La cita se completó correctamente");
            setEventoSeleccionado(null);
        } else {
            toast.error("Error al completar la cita");
        }


    };

    const onCitaEliminada = async ({ id }: { id: UUID }) => {

        const { success, message } = await eliminarCita(id);
        if (success) {
            refrescarCitasEliminar(id);
            toast.success(message || "La cita se eliminó correctamente");
            setModalOpen(false);
        } else {
            toast.error("Error al eliminar la cita");
        }
    };


    const onCitaAceptada = async ({ id }: { id: UUID }) => {
        const { success, message, cita } = await aceptarCita(id);
        if (success) {
            refrescarCitasAceptar({ id: cita.id });
            setModalOpen(false);
            toast.success(message);
        }
    }

    return {
        citasFormateadas,
        modalOpen,
        eventoSeleccionado,
        handleEventClick,
        onClose,
        onCitaCompletada,
        onCitaEliminada,
        onCitaAceptada
    };
}