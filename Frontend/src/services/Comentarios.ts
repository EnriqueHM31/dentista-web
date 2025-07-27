import { VITE_API_URL } from "@/config";
import type { FormActualizarComentarioProps, FormCrearComentarioProps } from "@/types/Comentarios/types";
import type { UUID } from "@/types/types";

export async function getComentarios() {
    const response = await fetch(`${VITE_API_URL}/comentarios`, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
    }
    return await response.json();
}

export async function createComentario({ nombre, email, mensaje, ranking, servicio }: FormCrearComentarioProps) {

    const response = await fetch(`${VITE_API_URL}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje, ranking, servicio }),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al crear el comentario");
    }

    return await response.json();
}


export async function updateComentarioVisibilidad({ id, visible }: FormActualizarComentarioProps) {
    const response = await fetch(`${VITE_API_URL}/comentarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ visible }),
        credentials: "include", // si usas cookies para auth
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al actualizar visibilidad");
    }

    return await response.json();
}


export async function deleteComentario(id: UUID) {
    const response = await fetch(`${VITE_API_URL}/comentarios/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await response.json();
}