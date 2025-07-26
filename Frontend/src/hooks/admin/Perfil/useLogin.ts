import { Login, Logout } from "@/services/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRedirigirSiAutenticado } from "./useRedirigirSiAutenticado";


export function useLogin() {
    const navigate = useNavigate();

    useRedirigirSiAutenticado();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const { username, password } = Object.fromEntries(data);

        try {
            const { success, message } = await Login(username.toString(), password.toString());

            if (!success) {
                toast.error(message || "Error al iniciar sesión");
            }
            toast.success(message);
            navigate("/admin/dashboard");
        } catch (error) {
            toast.error("Error de conexión con el servidor" + error + username + password);
        }
    }

    const handleLogout = async () => {
        const { success, message } = await Logout();

        if (!success) {
            toast.error(message || "Error al cerrar sesión");
            return
        }
        toast.success(message || "Sesión cerrada correctamente");
        navigate("/admin");

    }


    return {
        handleLogin,
        handleLogout
    }
}