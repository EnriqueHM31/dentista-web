import { VITE_API_URL } from "@/config";


export async function getUsuario() {
    const response = await fetch(`${VITE_API_URL}/usuario`, {
        credentials: "include",
        method: "GET",
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al obtener el usuario");
    }

    const { success, message } = await response.json();
    return { success, message };
}

export async function updateUsuario(username: string, password: string) {
    const response = await fetch(`${VITE_API_URL}/usuario`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    const { success, message } = await response.json();

    return { success, message };
}