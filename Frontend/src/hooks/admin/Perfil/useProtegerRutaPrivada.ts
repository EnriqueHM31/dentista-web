import { CheckLogin } from "@/services/Login";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useProtegerRutaPrivada() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verificar = async () => {
            const { success } = await CheckLogin();

            if (success) {
                if (location.pathname === "/admin") {
                    // Si ya está logueado, y está en el login, redirigir al dashboard
                    navigate("/admin/dashboard");
                }
                // Si está en el dashboard, no hacer nada (todo bien)
            } else {
                if (location.pathname !== "/admin") {
                    toast.error("No estás autenticado");
                    navigate("/admin");
                }
                // Si está en login y no está logueado, no redirigir
            }
        };

        verificar();
    }, [location, navigate]);
}
