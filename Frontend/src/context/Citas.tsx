import { createContext, useContext } from "react";
import type { CitasContextType } from "@/types/Citas/types";


export const CitasContext = createContext<CitasContextType>({
    citas: [],
    setCitas: () => { },
});


export function useCitasContext() {
    const { citas, setCitas } = useContext(CitasContext);
    return { citas, setCitas };
}


