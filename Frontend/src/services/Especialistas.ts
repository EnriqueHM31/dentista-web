import { VITE_API_URL } from "@/config";


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


