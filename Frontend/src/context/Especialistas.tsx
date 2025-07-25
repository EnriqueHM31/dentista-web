import { createContext, useContext } from "react";
import type { EspecialistasContextProps } from "@/types/Especialistas/types";



export const EspecialistasContext = createContext<EspecialistasContextProps>({
    especialistas: [],
    setEspecialistas: () => { },
    ordenarEspecialistas: () => []
});


export function useEspecialistasContext() {
    const { especialistas, setEspecialistas, ordenarEspecialistas } = useContext(EspecialistasContext);
    return { especialistas, setEspecialistas, ordenarEspecialistas };
}



