import { useContext, useState } from "react";
import { ServicioContext } from "@/context/Servicio";
import { CitasContext } from "@/context/Citas";
import { toast } from "sonner";
import { crearCita } from "@/services/Citas";

const INITIAL_FORM_CITA = {
    nombre: "",
    correo: "",
    telefono: "",
    fecha: "",
    servicio: "",
    hora: "",
    comentarios: "",
}

export function useCitas() {

    const { servicios } = useContext(ServicioContext);
    const { setCitas } = useContext(CitasContext);

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

    const handleChangeCrearCita = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormCrearCita({ ...FormCrearCita, [e.target.name]: e.target.value });
    }

    const handleSubmitCrearCita = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idServicio = servicios.find(({ titulo }) => titulo === FormCrearCita.servicio)?.id;

        const { success, message, cita } = await crearCita(FormCrearCita, idServicio as `${string}-${string}-${string}-${string}-${string}`);

        if (success) {
            setCitas(citas => [...citas, cita]);
            toast.success(message);
            setFormCrearCita(INITIAL_FORM_CITA);
        } else {
            toast.error(message);
        }
    }

    return {
        horas,
        FormCrearCita,
        handleChangeCrearCita,
        handleSubmitCrearCita,
        servicios
    };
}