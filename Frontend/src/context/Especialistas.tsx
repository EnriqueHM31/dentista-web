import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Especialista } from "@/types";

interface EspecialistasContextProps {
    especialistas: Especialista[];
    setEspecialistas: Dispatch<SetStateAction<Especialista[]>>;
    ordenarEspecialistas: (especialistas: Especialista[]) => Especialista[];
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



