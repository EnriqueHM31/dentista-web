import { getEspecialistas } from "@/services/Especialistas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EspecialistasContext } from "@/context/Especialistas";
import type { Especialista } from "@/types";

export function EspecialistasProvider({ children }: { children: React.ReactNode }) {
    const [especialistas, setEspecialistas] = useState<Especialista[]>([]);

    useEffect(() => {
        const obtenerEspecialistas = async () => {
            const { success, message } = await getEspecialistas();

            if (!success) {
                toast.error(message);
                return;
            }

            const especialistasOrdenados = message.sort((a: Especialista, b: Especialista) => {
                const nombreA = `${a.nombre} ${a.apellido}`.toLowerCase();
                const nombreB = `${b.nombre} ${b.apellido}`.toLowerCase();
                return nombreA.localeCompare(nombreB);
            });

            setEspecialistas(especialistasOrdenados);
        };
        obtenerEspecialistas();
    }, []);

    return (
        <EspecialistasContext.Provider value={{ especialistas, setEspecialistas }
        }>
            {children}
        </EspecialistasContext.Provider>
    )

}