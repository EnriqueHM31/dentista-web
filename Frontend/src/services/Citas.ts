import { toast } from "sonner";
import type { FormCrearCitaProps } from "@/types/Citas/types";

export async function getCitas() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {
        credentials: "include",
    });
    const { citas } = await response.json();
    return citas;
}

export async function crearCita(FormCrearCita: FormCrearCitaProps, idServicio: `${string}-${string}-${string}-${string}-${string}`) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            nombre: FormCrearCita.nombre,
            email: FormCrearCita.email,
            telefono: FormCrearCita.telefono,
            fecha: FormCrearCita.fecha,
            servicio: idServicio,
            hora: FormCrearCita.hora,
            comentarios: FormCrearCita.comentarios,
        }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al crear la cita");
    }
}

export async function completarCita(id: `${string}-${string}-${string}-${string}-${string}`) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completada: true }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al completar la cita");
    }
}


export async function eliminarCita(id: `${string}-${string}-${string}-${string}-${string}`) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al eliminar la cita");
    }
}
