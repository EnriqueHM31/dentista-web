export interface PreguntasContextType {
    preguntas: PreguntaProps[];
    setPreguntas: Dispatch<SetStateAction<PreguntaProps[]>>;
    obtenerPreguntas: () => Promise<void>;
    ordenarPreguntas: (preguntas: PreguntaProps[]) => PreguntaProps[];
}

export interface PreguntaProps {
    id: `${string}-${string}-${string}-${string}-${string}`;
    pregunta: string;
    respuesta: string;
}

export type PreguntaFormProps = Omit<PreguntaProps, "id">


export interface ModalEditarPreguntaProps {
    preguntaSeleccionada: Pregunta | null;
    toggle: () => void;
    handleEditarPregunta: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditarRespuesta: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleGuardar: (e: React.FormEvent<HTMLFormElement>) => void;
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
