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

            setEspecialistas(message);
        };
        obtenerEspecialistas();
    }, []);

    return (
        <EspecialistasContext.Provider value={{ especialistas }
        }>
            {children}
        </EspecialistasContext.Provider>
    )

}