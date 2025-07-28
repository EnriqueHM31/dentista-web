import { createContext, useContext } from "react";
import type { CitasContextType } from "@/types/Citas/types";


export const CitasContext = createContext<CitasContextType>({
    citas: [],
    setCitas: () => { },
    refrescarCitasCrear: () => { },
    refrescarCitasEliminar: () => { },
    refrescarCitasCompletar: () => { },
    refrescarNewCita: () => { },
});


export function useCitasContext() {
    const { citas, setCitas, refrescarCitasCrear, refrescarCitasEliminar, refrescarCitasCompletar, refrescarNewCita } = useContext(CitasContext);
    return { citas, setCitas, refrescarCitasCrear, refrescarCitasEliminar, refrescarCitasCompletar, refrescarNewCita };
}


