import { VITE_API_URL } from "@/config";


export async function getUsuario() {
    const response = await fetch(`${VITE_API_URL}/usuario`, {
        credentials: "include",
        method: "GET",
    })

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener el usuario" };
    }
}

export async function updateUsuario({ username, password }: { username: string, password: string }) {
    const response = await fetch(`${VITE_API_URL}/usuario`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar el usuario" };
    }
}