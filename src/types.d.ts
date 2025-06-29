export interface Servicio {
    name: string;
    description: string;
    img: string;
}

export interface LinksNavegacionProps {
    name: string;
    path: string;
    active: boolean;
}

export interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}


interface MenuNavegacionProps {
    isOpen: boolean;
    toggleMenu: () => void;
    clases: {
        textColor: string;
        buttonClasses: string;
        buttonMovilClasses: string;
        menubackground: string;
        BackgrounAfter: string;
        hoverColor: string;
    };
}

interface SlideData {
    title: string;
    descripcion: string;
    src: string;
    linkedin: string;
}

interface SlideProps {
    slide: SlideData;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}