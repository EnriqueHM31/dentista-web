import { CheckLogin } from "@/services/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckearAutenticacion() {
    const navigate = useNavigate();

    useEffect(() => {
        const verificar = async () => {
            const { success } = await CheckLogin();

            // Manejo defensivo en caso de undefined
            if (!success) {
                navigate("/admin");
            }
        };

        verificar();
    }, [navigate]);
}