import { VITE_API_URL } from "@/config";


export async function getEspecialistas() {
    const response = await fetch(`${VITE_API_URL}/especialistas`);
    const { success, message } = await response.json();

    if (!success) {
        throw new Error(message);
    }


    return { success, message };
}


