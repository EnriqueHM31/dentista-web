import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface CitasContextType {
    citas: CitaProps[];
    setCitas: Dispatch<SetStateAction<CitaProps[]>>;
    refrescarCitasCrear: (newCitas: CitaProps[]) => void;
    refrescarCitasEliminar: (id: UUID) => void;
    refrescarCitasCompletar: (citas: CitaProps[], id: UUID) => void;
}


export interface CitaProps {
    id: UUID;
    nombre: string;
    email: string;
    servicio: string;
    telefono: string;
    comentarios: string
    fecha: string;
    hora: string
    completada: boolean
}

export type CitaFormProps = Omit<CitaProps, "id" | "completada">;

export type FormCrearCitaProps = Omit<CitaProps, "id" | "servicio" | "completada">;


export interface CitasCalendarioProps {
    id: string;
    title: string;
    start: string;
    backgroundColor: string;
    extendedProps: {
        nombre: string;
        telefono: string;
        email: string;
        comentarios: string;
        servicio: string;
        fecha: string;
        hora: string;
        completada: boolean;
    };
}
