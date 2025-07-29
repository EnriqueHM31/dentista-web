import { useEffect, useState } from "react";
import { useServicioContext } from "@/context/Servicio";
import { useCitasContext } from "@/context/Citas";
import { toast } from "sonner";
import { crearCita } from "@/services/Citas";
import { INITIAL_FORM_CITA } from "@/constants/Citas";
import { generateAllSlots, isSlotRangeAvailable, parseFechaToISO } from "@/utils/InputHora";
import type { Appointment } from "@/types/Citas/types";
import { validarCamposLlenos } from "@/utils/Validacion";

export function useCitas() {

    const { servicios } = useServicioContext();
    const { refrescarNewCita } = useCitasContext();

    function generarHoras(inicio: string, fin: string, intervaloMin: number): string[] {
        const [hInicio, mInicio] = inicio.split(":").map(Number);
        const [hFin, mFin] = fin.split(":").map(Number);

        const resultado: string[] = [];

        const fecha = new Date();
        fecha.setHours(hInicio, mInicio, 0, 0);

        const finFecha = new Date();
        finFecha.setHours(hFin, mFin, 0, 0);

        while (fecha <= finFecha) {
            const hora = fecha.toTimeString().slice(0, 5);
            resultado.push(hora);
            fecha.setMinutes(fecha.getMinutes() + intervaloMin);
        }

        return resultado;
    }


    const horas = generarHoras("08:00", "18:00", 30);

    const [FormCrearCita, setFormCrearCita] = useState(INITIAL_FORM_CITA);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const fechaFormateada = tomorrow.toLocaleDateString("mx-MX", {
            timeZone: "America/Mexico_City"
        });

        setFormCrearCita(prev => ({ ...prev, fecha: fechaFormateada }));

    }, [servicios]);

    const handleChangeCrearCita = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormCrearCita({ ...FormCrearCita, [e.target.name]: e.target.value });
    }

    const handleSubmitCrearCita = async (e: React.FormEvent<HTMLFormElement>, allAppointments: Appointment[]) => {
        e.preventDefault();

        const camposValidos = validarCamposLlenos(FormCrearCita);
        if (!camposValidos) return; // Detener el envío si falta algún campo

        const idServicio = servicios.find(({ titulo }) => titulo === FormCrearCita.servicio)?.id;
        const duracion = servicios.find(({ titulo }) => titulo === FormCrearCita.servicio)?.duration;
        if (!idServicio || !duracion) return;



        const slots = generateAllSlots(FormCrearCita.fecha, allAppointments);

        const esValido = isSlotRangeAvailable(FormCrearCita.hora, duracion, slots);
        if (!esValido) {
            toast.error("No hay suficiente espacio disponible en ese horario para este servicio.");
            return;
        }

        const dataCrearCita = {
            nombre: FormCrearCita.nombre,
            email: FormCrearCita.email,
            telefono: FormCrearCita.telefono,
            comentarios: FormCrearCita.comentarios,
            servicio: idServicio,
            fecha: parseFechaToISO(FormCrearCita.fecha),
            hora: FormCrearCita.hora,
        }

        const { success, message, cita } = await crearCita(dataCrearCita, idServicio);

        if (success) {
            refrescarNewCita(cita);
            toast.success(message);
            setFormCrearCita(INITIAL_FORM_CITA);
        } else {
            toast.error(message);
        }
    };

    return {
        horas,
        FormCrearCita,
        handleChangeCrearCita,
        handleSubmitCrearCita,
        servicios
    };
}