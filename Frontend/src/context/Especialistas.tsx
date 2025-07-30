import type { EspecialistasContextProps } from "@/types/Especialistas/types";
import { createContext, useContext } from "react";



export const EspecialistasContext = createContext<EspecialistasContextProps>({
    especialistas: [],
    setEspecialistas: () => { },
    ordenarEspecialistas: () => [],
    refrescarEspecialistasEditar: () => { },
    refrescarEspecialistasEliminar: () => { },
    refrescarEspecialistasCrear: () => { },
});


export function useEspecialistasContext() {
    const { especialistas, setEspecialistas, ordenarEspecialistas, refrescarEspecialistasEditar, refrescarEspecialistasEliminar, refrescarEspecialistasCrear } = useContext(EspecialistasContext);
    return { especialistas, setEspecialistas, ordenarEspecialistas, refrescarEspecialistasEditar, refrescarEspecialistasEliminar, refrescarEspecialistasCrear };
}



