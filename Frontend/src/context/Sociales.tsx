import type { SocialProps } from "@/types";
import { createContext, useContext } from "react";

// 1. Define el tipo del contexto
interface SocialesContextType {
    sociales: SocialProps[];
    setSociales: React.Dispatch<React.SetStateAction<SocialProps[]>>;
}

// 2. Crea y EXPORTA el contexto (¡esto es clave!)
export const SocialesContext = createContext<SocialesContextType>({
    sociales: [],
    setSociales: () => { }
});

export function useSocialesContext() {
    const { sociales, setSociales } = useContext(SocialesContext);
    return { sociales, setSociales };
}


