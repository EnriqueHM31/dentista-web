import { CitasContext } from "@/context/Citas";
import { useEffect, useState } from "react";
import type { CitaProps } from "@/types/Citas/types";

export default function CitasProvider({ children }: { children: React.ReactNode }) {
    const [citas, setCitas] = useState<CitaProps[]>([]);

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
