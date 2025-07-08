import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ServicioResponse {
    id: `${string}-${string}-${string}-${string}-${string}` | "";
    name: string;
    description: string;
    img: string;
}

export function useGetServicios() {

    const [servicios, setServicios] = useState<ServicioResponse[]>([]);
    const formRef = useRef<ServicioResponse[]>([]);


    useEffect(() => {
        const fetchServicios = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios`);
            const { success, message } = await response.json();
            if (success) {
                setServicios(message);
                formRef.current = message;

            } else {
                toast.error(message || "Error al cargar los servicios");
            }
        };
        fetchServicios();
    }, []);


    return { servicios, serviciosRef: formRef };
}
