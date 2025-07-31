import { VITE_API_URL } from "@/config";
import { toast } from "sonner";

export async function Login({ username, password }: { username: string, password: string }) {
    const response = await fetch(`${VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        toast.error("Error al iniciar sesión");
        return;
    }

    return await response.json();
}


export async function Logout() {
    const response = await fetch(`${VITE_API_URL}/login/logout`, {
        credentials: "include",
    });

    if (!response.ok) {
        toast.error("Error al cerrar sesión");
    }
    const { success, message } = await response.json();
    return { success, message };
}

export async function CheckLogin() {

    const response = await fetch(`${VITE_API_URL}/login/autenticacion`, {
        method: "GET",
        credentials: "include",
    });

    return await response.json();

}