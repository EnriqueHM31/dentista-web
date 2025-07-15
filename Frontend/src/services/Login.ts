import { toast } from "sonner";



export async function Login(username: string, password: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    if (!response.ok) {
        toast.error("Error al iniciar sesión");
        return;
    }

    return await response.json();
}


export async function Logout() {
    const response = await fetch("http://localhost:3000/api/login/logout", {
        credentials: "include",
    });

    if (!response.ok) {
        toast.error("Error al cerrar sesión");
    }
    const { success, message } = await response.json();
    return { success, message };
}

export async function CheckLogin() {

    const response = await fetch("http://localhost:3000/api/login/autenticacion", {
        method: "GET",
        credentials: "include",
    });

    const { success, message } = await response.json() as { success: boolean, message: string };
    return { success, message };

}