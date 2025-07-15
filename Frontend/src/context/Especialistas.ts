import { createContext } from "react";
import type { Especialista } from "@/types";

interface EspecialistasContextProps {
    especialistas: Especialista[];
}

export const EspecialistasContext = createContext<EspecialistasContextProps>({
    especialistas: [],
});


