import { VITE_API_URL } from "@/config";

export async function getComentarios() {
    const response = await fetch(`${VITE_API_URL}/comentarios`, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
    }
    const { success, message } = await response.json();
    return { success, message };
}

export async function createComentario({ categoria, username, email, comentario, ranking }: { categoria: string, username: string, email: string, comentario: string, ranking: number }) {

    const response = await fetch(`${VITE_API_URL}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria, username, email, comentario, ranking }),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al crear el comentario");
    }

    return await response.json();
}


export async function updateComentarioVisibilidad({ id, visible }: { id: string, visible: boolean }) {
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


export async function deleteComentario(id: `${string}-${string}-${string}-${string}-${string}`) {
    const response = await fetch(`${VITE_API_URL}/comentarios/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const { success, message } = await response.json();
    return { success, message };
}