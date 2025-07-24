import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { CitaProps } from "@/types/Citas/types";

interface CitasContextType {
    citas: CitaProps[];
    setCitas: Dispatch<SetStateAction<CitaProps[]>>;
}

export const CitasContext = createContext<CitasContextType>({
    citas: [],
    setCitas: () => { },
});


export function useCitasContext() {
    const { citas, setCitas } = useContext(CitasContext);
    return { citas, setCitas };
}


