import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface ComentariosContextTypeProps {
    comentarios: ComentarioProps[];
    setComentarios: Dispatch<SetStateAction<ComentarioProps[]>>;
    comentariosVisibles: ComentarioProps[];
    setFiltros: (filtros: Partial<Filtros>) => void;
    filtros: Filtros;
}

export interface ComentarioProps {
    id: UUID;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    servicio: string;
    visible: boolean;
}

export interface ArrayComentariosProps {
    comentarios: ComentarioProps[];
}

export type FormCrearComentarioProps = Omit<ComentarioProps, "id" | "visible">

export type FormActualizarComentarioProps = Omit<ComentarioProps, | "nombre" | "email" | "mensaje" | "ranking" | "servicio">

export interface Filtros {
    ordenar: "asc" | "desc" | null;
    ranking: number | null;
    seleccion: "checkeados" | "no_checkeados" | null;
}

export type MenuFiltro = keyof typeof MENU_FILTROS;

export interface StarRatingProps {
    name: string;
    onChange?: (value: number) => void;
}

export interface StartsTestimonialsProps {
    numero: number;
}

export interface TestimonioProps {
    comentario: ComentarioProps;
    onCheckToggle?: (index: UUID) => void;
    movil?: boolean;
    checked?: boolean;
    index?: number;
    comentarioModificado?: boolean;
}


// LOGIN ----------------------------------------------
export interface ComentariosCardProps {
    comentarios: ComentarioProps[];
    onCheckToggle: (id: UUID) => void;
    seleccionados: { [key: UUID]: boolean };
}