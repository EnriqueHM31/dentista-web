import { toast } from "sonner";

interface FormCrearCita {

    nombre: string;
    correo: string;
    telefono: string;
    fecha: string;
    servicio: string;
    hora: string;
    comentarios: string;
}

export async function crearCita(FormCrearCita: FormCrearCita, idServicio: `${string}-${string}-${string}-${string}-${string}`) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            nombre: FormCrearCita.nombre,
            email: FormCrearCita.correo,
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
