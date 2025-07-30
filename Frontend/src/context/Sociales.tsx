import type { SocialesContextType } from "@/types/Sociales/types";
import { createContext, useContext } from "react";


// 2. Crea y EXPORTA el contexto (¡esto es clave!)
export const SocialesContext = createContext<SocialesContextType>({
    sociales: [],
    setSociales: () => { }
});

export function useSocialesContext() {
    const { sociales, setSociales } = useContext(SocialesContext);
    return { sociales, setSociales };
}


