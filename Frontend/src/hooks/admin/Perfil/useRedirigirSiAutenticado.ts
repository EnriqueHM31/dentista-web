// hooks/useRedirigirSiAutenticado.ts
import { CheckLogin } from "@/services/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
