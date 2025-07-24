import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { EspecialistaProps } from "@/types/Especialistas/types";

interface EspecialistasContextProps {
    especialistas: EspecialistaProps[];
    setEspecialistas: Dispatch<SetStateAction<EspecialistaProps[]>>;
    ordenarEspecialistas: (especialistas: EspecialistaProps[]) => EspecialistaProps[];
}

export const EspecialistasContext = createContext<EspecialistasContextProps>({
    especialistas: [],
    setEspecialistas: () => { },
    ordenarEspecialistas: () => []
});


export function useEspecialistasContext() {
    const { especialistas, setEspecialistas, ordenarEspecialistas } = useContext(EspecialistasContext);
    return { especialistas, setEspecialistas, ordenarEspecialistas };
}



