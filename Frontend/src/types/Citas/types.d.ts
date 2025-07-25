
export interface CitasContextType {
    citas: CitaProps[];
    setCitas: Dispatch<SetStateAction<CitaProps[]>>;
}


export interface CitaProps {
    id: `${string}-${string}-${string}-${string}-${string}`;
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
