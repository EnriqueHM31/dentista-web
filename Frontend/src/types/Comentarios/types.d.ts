export interface ComentarioProps {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    servicio: string;
    visible: boolean | number;
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
    id?: string
    client_name: string;
    rating: number;
    comment: string;
    index: number;
    visible?: number | boolean;
    checked?: boolean;
    onCheckToggle?: (index: number) => void;
    movil?: boolean;
}


// LOGIN ----------------------------------------------
interface ComentariosCardProps {
    comentarios: ComentarioProps[];
    toggleCheck: (id: number) => void;
    seleccionados: { [key: string]: boolean };
}