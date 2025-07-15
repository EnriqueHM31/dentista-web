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

export async function createComentario(form: Record<string, string>) {

    console.log(form);

    const { categoria, username, email, message: comentario, experiencia: ranking } = form;
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

