import { VITE_API_URL } from "@/config";


export const getDataPreguntas = async () => {

    const response = await fetch(`${VITE_API_URL}/preguntas`);
    const { success, message } = await response.json();
    if (response.ok) {
        return { success, message };
    } else {
        return { success: false, message: "Error al obtener las preguntas" };
    }
}

export const createPregunta = async (pregunta: string, respuesta: string) => {
    const response = await fetch(`${VITE_API_URL}/preguntas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta, respuesta }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al crear la pregunta" };
    }

}

export const deletePregunta = async (id: `${string}-${string}-${string}-${string}-${string}`) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al eliminar la pregunta" };
    }
}


export const updatePregunta = async (id: `${string}-${string}-${string}-${string}-${string}`, pregunta: string, respuesta: string) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pregunta: pregunta,
            respuesta: respuesta,
        }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar la pregunta" };
    }
}
