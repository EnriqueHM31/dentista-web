import { useState, useEffect } from "react";
import { SocialesContext } from "@/context/Sociales";
import { getDataSociales } from "@/services/Sociales";
import type { SocialProps } from "@/types/Sociales/types";
import { toast } from "sonner";

// 3. Proveedor del contexto
export const SocialesProvider = ({ children }: { children: React.ReactNode }) => {
    const [sociales, setSociales] = useState<SocialProps[]>([]);

    const getSociales = async () => {
        const { success, message, redesSociales: sociales } = await getDataSociales();
        if (!success) {
            toast.error(message);
            return;
        }
        setSociales(sociales);
    };

    useEffect(() => {
        getSociales();
    }, []);

    return (
        <SocialesContext.Provider value={{ sociales, setSociales }
        }>
            {children}
        </SocialesContext.Provider>
    );
};
