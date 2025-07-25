import { createContext, useContext } from "react";
import type { SocialesContextType } from "@/types/Sociales/types";


// 2. Crea y EXPORTA el contexto (¡esto es clave!)
export const SocialesContext = createContext<SocialesContextType>({
    sociales: [],
    setSociales: () => { }
});

export function useSocialesContext() {
    const { sociales, setSociales } = useContext(SocialesContext);
    return { sociales, setSociales };
}


