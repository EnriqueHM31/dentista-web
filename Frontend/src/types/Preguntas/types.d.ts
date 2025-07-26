import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface PreguntasContextType {
    preguntas: PreguntaProps[];
    setPreguntas: Dispatch<SetStateAction<PreguntaProps[]>>;
    obtenerPreguntas: () => Promise<void>;
    ordenarPreguntas: (preguntas: PreguntaProps[]) => PreguntaProps[];
    refrescarPreguntasCrear: (preguntaCreada: PreguntaProps) => void;
    refrescarPreguntasEditar: (preguntaSeleccionada: PreguntaProps, id: UUID) => void;
    refrescarPreguntasEliminar: (id: UUID) => void;
}

export interface PreguntaProps {
    id: UUID;
    pregunta: string;
    respuesta: string;
}

export type PreguntaFormProps = Omit<PreguntaProps, "id">


export interface ModalEditarPreguntaProps {
    preguntaSeleccionada: Pregunta | null;
    toggle: () => void;
    handleEditarCampoPregunta: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleEditarPregunta: (e: React.FormEvent<HTMLFormElement>) => void;
}


export interface ModalCrearPreguntaProps {
    toggle: () => void;
    handleCrearPregunta: (e: React.FormEvent<HTMLFormElement>) => void;
    preguntaForm: { pregunta: string; respuesta: string };
    handleCambiarCampoPregunta: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Hooks
export interface CrearPreguntaProps {
    handleClickDesactivarModal: () => void;
}
