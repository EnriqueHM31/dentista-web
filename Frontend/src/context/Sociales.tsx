import type { SocialProps } from "@/types";
import {
    createContext,
    useEffect,
    useState,
    useContext,
} from "react";
import { getDataSociales } from "@/services/Sociales";

// 1. Define el tipo del contexto
interface SocialesContextType {
    sociales: SocialProps[];
}

// 2. Crea y EXPORTA el contexto (¡esto es clave!)
export const SocialesContext = createContext<SocialesContextType | null>(null);


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
        <SocialesContext.Provider value={{ sociales }
        }>
            {children}
        </SocialesContext.Provider>
    );
};

// 4. Hook personalizado para consumir el contexto
export const useSocialesContext = () => useContext(SocialesContext);
