import { useCitasContext } from "@/context/Citas";
import { useOpenWithTransition } from "@/hooks/general/useOpen";
import { aceptarCita, completarCita, eliminarCita } from "@/services/Citas";
import type { CitasCalendarioProps } from "@/types/Citas/types";
import type { UUID } from "@/types/types";
import { formatearHora, verificacionFechaHora } from "@/utils/Hora";
import type { EventClickArg } from '@fullcalendar/core';
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useCitasCalendario() {

    const [eventoSeleccionado, setEventoSeleccionado] = useState<CitasCalendarioProps | null>(null);
    const { citas, refrescarCitasCompletar, refrescarCitasEliminar, refrescarCitasAceptar } = useCitasContext();
    const { close, isOpen, toggle } = useOpenWithTransition();

    const citasFormateadas: CitasCalendarioProps[] = citas.map((cita) => {
        const styleEvento = cita.completada ? "#22c55e" : cita.aceptada ? "#f0f" : "#f00";
        return {
            id: cita.id,
            title: `${cita.nombre} - ${cita.servicio}`,
            start: `${cita.fecha.substring(0, 10)}T${formatearHora(cita.hora)}`,
            backgroundColor: styleEvento,
            extendedProps: {
                nombre: cita.nombre,
                telefono: cita.telefono,
                email: cita.email,
                comentarios: cita.comentarios,
                servicio: cita.servicio,
                fecha: cita.fecha,
                hora: cita.hora,
                completada: cita.completada,
                aceptada: cita.aceptada,
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
                const { success, message, cita: citaCompletada } = await completarCita({ id: cita.id });
                if (success) {
                    refrescarCitasCompletar(citas, citaCompletada.id || cita.id);
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
                aceptada: extendedProps.aceptada,
            },
        });
        toggle();
    };

    const onClose = () => {
        close();
        setEventoSeleccionado(null);
    };

    const onCitaCompletada = async ({ id }: { id: UUID }) => {

        const { success, message, cita } = await completarCita({ id });
        if (success) {
            refrescarCitasCompletar(citas, cita.id || id);
            close();
            toast.success(message || "La cita se completó correctamente");
            setEventoSeleccionado(null);
        } else {
            toast.error("Error al completar la cita");
        }


    };

    const onCitaEliminada = async ({ id }: { id: UUID }) => {

        const { success, message } = await eliminarCita({ id });
        if (success) {
            refrescarCitasEliminar(id);
            toast.success(message || "La cita se eliminó correctamente");
            close();
        } else {
            toast.error("Error al eliminar la cita");
        }
    };


    const onCitaAceptada = async ({ id }: { id: UUID }) => {
        const { success, message, cita } = await aceptarCita({ id });
        if (success) {
            refrescarCitasAceptar({ id: cita.id });
            close();
            toast.success(message);
        }
    }

    return {
        citasFormateadas,
        eventoSeleccionado,
        handleEventClick,
        onClose,
        onCitaCompletada,
        onCitaEliminada,
        onCitaAceptada,
        toggle,
        isOpen

    };
}