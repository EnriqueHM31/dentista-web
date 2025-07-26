import { VITE_API_URL } from "@/config";
import type { UUID } from "@/types/types";


export const getDataSociales = async () => {

    const response = await fetch(`${VITE_API_URL}/sociales`);

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener las redes sociales" };
    }
}

export const updateSocial = async (id: UUID, referencia: string) => {
    const response = await fetch(`${VITE_API_URL}/sociales/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referencia: referencia }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al actualizar la red social" };
    }
}