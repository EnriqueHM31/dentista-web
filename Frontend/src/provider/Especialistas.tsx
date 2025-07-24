import { getEspecialistas } from "@/services/Especialistas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EspecialistasContext } from "@/context/Especialistas";
import type { EspecialistaProps } from "@/types/Especialistas/types";

export function EspecialistasProvider({ children }: { children: React.ReactNode }) {
    const [especialistas, setEspecialistas] = useState<EspecialistaProps[]>([]);

    useEffect(() => {
        const obtenerEspecialistas = async () => {
            const { success, message } = await getEspecialistas();

            if (!success) {
                toast.error(message);
                return;
            }

            setEspecialistas(message);
        };
        obtenerEspecialistas();
    }, []);

    const ordenarEspecialistas = (especialistas: EspecialistaProps[]) => {
        return [...especialistas].sort((a, b) => {
            const nombreA = `${a.nombre} ${a.apellido}`.toLowerCase();
            const nombreB = `${b.nombre} ${b.apellido}`.toLowerCase();
            return nombreA.localeCompare(nombreB);
        });
    };


    return (
        <EspecialistasContext.Provider value={{ especialistas, setEspecialistas, ordenarEspecialistas }}>
            {children}
        </EspecialistasContext.Provider>
    )

}