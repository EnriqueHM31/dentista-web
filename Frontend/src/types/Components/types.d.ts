import type { Appointment, CitaFormProps } from "../Citas/types";

const POSITIONS = ["top", "bottom", "left", "right"] as const;

export interface TituloSeccionProps {
    titulo: string;
    clases?: string;
}

export interface SlideDataProps {
    title: string;
    descripcion: string;
    src: string;
    linkedin: string;
}

export interface SelectProps {
    funcion?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    select?: string;
    name: string;
    options: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    clases?: string;
    selectClass?: string;
    menuClass?: string;
    itemClass?: string;
    itemHoverClass?: string;
    textClass?: string;
}

export interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: (typeof POSITIONS)[number]
}

export interface CarouselProps {
    slides: EspecialistaProps[];
}

export interface CarouselControlProps {
    type: string;
    title: string;
    handleClick: () => void;
}

export interface SlideProps {
    slide: Especialista;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}


export interface ToastConfirmacionOptions {
    mensaje: string;
    textoAccion: string;
    onConfirmar: () => void | Promise<void>;
    textoCancelar?: string;
    onCancelar?: () => void;
};

export interface RankingProps {
    onChange?: (value: number) => void;
}

export interface useCopyTextProps {
    text: string;
    mensaje: string;
}

export interface UseTiempoProps {
    FormCrearCita: CitaFormProps;
    handleChangeCrearCita: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void;
}

interface useTimePicketProps {
    name: string;
    date: string;
    appointments: Appointment[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}