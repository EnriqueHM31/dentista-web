// hooks/useRedirigirSiAutenticado.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckLogin } from "@/services/Login";

export function useRedirigirSiAutenticado() {
    const navigate = useNavigate();

    useEffect(() => {
        const verificar = async () => {
            const { success } = await CheckLogin();
            if (success) {
                navigate("/admin/dashboard");
            }
        };

        verificar();
    }, [navigate]);
}
