import { VITE_API_URL } from "@/config";


export const getDataSociales = async () => {

    const response = await fetch(`${VITE_API_URL}/sociales`);
    const { success, message } = await response.json();
    return { success, message };
}

export const updateSocial = async (id: string, referencia: string) => {
    const response = await fetch(`${VITE_API_URL}/sociales/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referencia: referencia }),
    });
    const { success, message } = await response.json();
    return { success, message };
}