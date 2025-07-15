import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Especialista } from "@/types";

interface EspecialistasContextProps {
    especialistas: Especialista[];
    setEspecialistas: Dispatch<SetStateAction<Especialista[]>>;
}

export const EspecialistasContext = createContext<EspecialistasContextProps>({
    especialistas: [],
    setEspecialistas: () => { },
});


