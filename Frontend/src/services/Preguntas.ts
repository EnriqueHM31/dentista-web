import { VITE_API_URL } from "@/config";
import type { UUID } from "@/types/types";


export const getDataPreguntas = async () => {

    const response = await fetch(`${VITE_API_URL}/preguntas`, {
        credentials: "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener las preguntas" };
    }
}

export const createPregunta = async ({ pregunta, respuesta }: { pregunta: string, respuesta: string }) => {
    const response = await fetch(`${VITE_API_URL}/preguntas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta, respuesta }),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al crear la pregunta" };
    }

}

export const deletePregunta = async (id: UUID) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al eliminar la pregunta" };
    }
}


export const updatePregunta = async ({ id, pregunta, respuesta }: { id: UUID, pregunta: string, respuesta: string }) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pregunta: pregunta,
            respuesta: respuesta,
        }),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar la pregunta" };
    }
}
