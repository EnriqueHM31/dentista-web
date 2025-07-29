import { toast } from "sonner";
import type { FormCrearCitaProps } from "@/types/Citas/types";
import type { UUID } from "@/types/types";
import { VITE_API_URL } from "@/config";

export async function getCitas() {
    const response = await fetch(`${VITE_API_URL}/citas`, {
        credentials: "include",
    });
    if (response.ok) {
        return await response.json();

    } else {
        return { success: false, message: "Error al obtener las citas", citas: [] };
    }
}

export async function crearCita({ FormCrearCita, idServicio }: { FormCrearCita: FormCrearCitaProps, idServicio: UUID }) {
    const response = await fetch(`${VITE_API_URL}/citas`, {
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

export async function completarCita({ id }: { id: UUID }) {
    const response = await fetch(`${VITE_API_URL}/citas/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completado: true }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al completar la cita");
    }
}


export async function eliminarCita({ id }: { id: UUID }) {
    const response = await fetch(`${VITE_API_URL}/citas/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al eliminar la cita");
    }
}

export async function aceptarCita({ id }: { id: UUID }) {
    const response = await fetch(`${VITE_API_URL}/citas/${id}/aceptar`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ aceptada: true }),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        toast.error("Error al aceptar la cita");
    }
}
