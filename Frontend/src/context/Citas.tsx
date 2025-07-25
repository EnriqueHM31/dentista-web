import { createContext, useContext } from "react";
import type { CitasContextType } from "@/types/Citas/types";


export const CitasContext = createContext<CitasContextType>({
    citas: [],
    setCitas: () => { },
    refrescarCitasCrear: () => { },
    refrescarCitasEliminar: () => { },
    refrescarCitasCompletar: () => { },
});


export function useCitasContext() {
    const { citas, setCitas, refrescarCitasCrear, refrescarCitasEliminar, refrescarCitasCompletar } = useContext(CitasContext);
    return { citas, setCitas, refrescarCitasCrear, refrescarCitasEliminar, refrescarCitasCompletar };
}


