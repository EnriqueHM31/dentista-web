import { useState, useEffect } from "react";
import { SocialesContext } from "@/context/Sociales";
import { getDataSociales } from "@/services/Sociales";
import type { SocialProps } from "@/types";

// 3. Proveedor del contexto
export const SocialesProvider = ({ children }: { children: React.ReactNode }) => {
    const [sociales, setSociales] = useState<SocialProps[]>([]);

    const getSociales = async () => {
        const { success, message } = await getDataSociales();
        if (success) {
            setSociales(message);
        }
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
