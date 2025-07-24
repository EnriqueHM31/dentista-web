const POSITIONS = ["top", "bottom", "left", "right"] as const;

export interface TituloSeccionProps {
    titulo: string;
    clases?: string;
}

interface SlideDataProps {
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
