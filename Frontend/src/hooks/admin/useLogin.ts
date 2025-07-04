import { toast } from "sonner";

export function useLogin() {

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const { username, password } = Object.fromEntries(data);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // ✅ importante para recibir cookies httpOnly
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Inicio de sesión exitoso");

            } else {
                toast.error(result.message || "Error al iniciar sesión");
            }
        } catch (error) {
            toast.error("Error de conexión con el servidor" + error + username + password);
        }
    }
    return {
        handleLogin
    }
}