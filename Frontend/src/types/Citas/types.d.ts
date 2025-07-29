import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface CitasContextType {
    citas: CitaProps[];
    setCitas: Dispatch<SetStateAction<CitaProps[]>>;
    refrescarCitasCrear: (newCitas: CitaProps[]) => void;
    refrescarCitasEliminar: (id: UUID) => void;
    refrescarCitasCompletar: (citas: CitaProps[], id: UUID) => void;
    refrescarNewCita: (cita: CitaProps) => void;
    refrescarCitasAceptar: ({ id }: { id: UUID }) => void;
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
    aceptada: boolean
}

export type CitaFormProps = Omit<CitaProps, "id" | "completada">;

export type FormCrearCitaProps = Omit<CitaProps, "id" | "servicio" | "completada">;


export interface CitasCalendarioProps {
    id: UUID;
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


export interface Appointment {
    id: string;
    fecha: string; // formato ISO: "YYYY-MM-DDTHH:mm:ss.sssZ"
    hora: string;  // formato "HH:mm:ss" o "HH:mm"
    duration: number; // minutos
}

interface TimeSlot {
    time: string;
    available: boolean;
}


interface TimePickerProps {
    name: string;
    date: string; // formato "YYYY-MM-DD"
    appointments: Appointment[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface DatePickerProps {
    name: string;
    value: string;                    // "YYYY-MM-DD"
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    minDate?: string;                 // opcional, p.ej. para bloquear fechas pasadas
}
