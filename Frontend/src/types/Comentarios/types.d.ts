export interface ComentarioProps {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
}


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