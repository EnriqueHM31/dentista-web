import { VITE_API_URL } from "@/config";
import type { EspecialistaProps, FormCrearEspecialistaProps } from "@/types/Especialistas/types";
import type { UUID } from "@/types/types";


export async function getEspecialistas() {
    const response = await fetch(`${VITE_API_URL}/especialistas`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { success, message } = await response.json();

    if (!success) {
        throw new Error(message);
    }

    return { success, message };
}

export async function createEspecialista(newEspecialista: FormCrearEspecialistaProps) {
    const response = await fetch(`${VITE_API_URL}/especialistas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEspecialista),
        credentials: "include",
    });
    if (!response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al crear el especialista" };
    }
}

export async function updateEspecialista(id: UUID, camposCambiados: Partial<EspecialistaProps>) {
    const response = await fetch(`${VITE_API_URL}/especialistas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camposCambiados),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar el especialista" };
    }
}

export async function deleteEspecialista(id: UUID) {
    const response = await fetch(`${VITE_API_URL}/especialistas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al eliminar el especialista" };
    }
}



