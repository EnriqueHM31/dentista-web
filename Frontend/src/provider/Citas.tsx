import { CitasContext } from "@/context/Citas";
import { useEffect, useState } from "react";
interface Cita {
    id: string;
    nombre: string;
    email: string;
    servicio: string;
    telefono: string;
    comentarios: string
    fecha: string;
    hora: string
    completada: boolean
}

export default function CitasProvider({ children }: { children: React.ReactNode }) {
    const [citas, setCitas] = useState<Cita[]>([]);

    useEffect(() => {
        const fetchCitas = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/citas`, {
                credentials: "include",
            });
            const { citas } = await response.json();
            setCitas(citas);
        }
        fetchCitas();
    }, []);

    return <CitasContext.Provider value={{ citas, setCitas }}>{children}</CitasContext.Provider>;
}
