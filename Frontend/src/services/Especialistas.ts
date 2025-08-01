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
    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener los especialistas", especialistas: [] };
    }
}

export async function createEspecialista({ newEspecialista }: { newEspecialista: FormCrearEspecialistaProps }) {
    const response = await fetch(`${VITE_API_URL}/especialistas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEspecialista),
        credentials: "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al crear el especialista", especialista: {} };
    }
}

export async function updateEspecialista({ id, camposCambiados }: { id: UUID, camposCambiados: Partial<EspecialistaProps> }) {
    const response = await fetch(`${VITE_API_URL}/especialistas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camposCambiados),
        credentials: "include",
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar el especialista", especialista: {} };
    }
}

export async function deleteEspecialista({ id }: { id: UUID }) {
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
        return { success: false, message: "Error al eliminar el especialista", especialista: {} };
    }
}



