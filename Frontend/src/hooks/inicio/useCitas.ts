import { crearCita } from "@/services/Citas";
import { generateAllSlots, isSlotRangeAvailable, parseFechaToISO } from "@/utils/InputHora";
import { INITIAL_FORM_CITA } from "@/constants/Citas";
import { ObtenerFechaActualMasUno } from "@/utils/Hora";
import { toast } from "sonner";
import { useCitasContext } from "@/context/Citas";
import { useEffect, useState } from "react";
import { useServicioContext } from "@/context/Servicio";
import { validarCamposLlenos } from "@/utils/Validacion";
import type { Appointment } from "@/types/Citas/types";

export function useCitas() {

    const { servicios } = useServicioContext();
    const { citas, refrescarNewCita } = useCitasContext();

    const [FormCrearCita, setFormCrearCita] = useState(INITIAL_FORM_CITA);

    useEffect(() => {
        setFormCrearCita(prev => ({ ...prev, fecha: ObtenerFechaActualMasUno(), servicio: servicios[0]?.titulo }));
    }, [citas]);


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

        const { success, message, cita } = await crearCita({ FormCrearCita: dataCrearCita, idServicio });

        if (success) {
            refrescarNewCita(cita);

            toast.success(message);
            setFormCrearCita(INITIAL_FORM_CITA);
        } else {
            toast.error(message);
        }
    };

    return {
        FormCrearCita,
        handleChangeCrearCita,
        handleSubmitCrearCita,
        servicios
    };
}