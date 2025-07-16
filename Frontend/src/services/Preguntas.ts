import { VITE_API_URL } from "@/config";


export const getDataPreguntas = async () => {

    const response = await fetch(`${VITE_API_URL}/preguntas`);
    const { success, message } = await response.json();
    return { success, message };
}

export const createPregunta = async (pregunta: string, respuesta: string) => {
    const response = await fetch(`${VITE_API_URL}/preguntas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta, respuesta }),
    });

    const { success, message } = await response.json();
    return { success, message };

}

export const deletePregunta = async (id: `${string}-${string}-${string}-${string}-${string}`) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "DELETE",
    });

    const { success, message } = await response.json();

    return { success, message };
}


export const updatePregunta = async (id: number, pregunta: string, respuesta: string) => {
    const response = await fetch(`${VITE_API_URL}/preguntas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pregunta: pregunta,
            respuesta: respuesta,
        }),
    });

    const { success, message } = await response.json();
    return { success, message };
}
