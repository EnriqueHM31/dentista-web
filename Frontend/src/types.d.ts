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

interface ModalCrearProps {
    toggle: () => void;
    handleCrearPregunta: (e: React.FormEvent<HTMLFormElement>) => void;
    pregunta: string;
    respuesta: string;
    setPregunta: React.Dispatch<React.SetStateAction<string>>;
    setRespuesta: React.Dispatch<React.SetStateAction<string>>;
}

interface Pregunta {
    id: number;
    pregunta: string;
    respuesta: string;
}

interface ModalEditarProps {
    preguntaSeleccionada: Pregunta | null;
    toggle: () => void;
    handleEditarPregunta: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditarRespuesta: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleGuardar: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface SocialProps {
    id: string;
    nombre: string;
    referencia: string;
}

interface AsideMenuProps {
    selected: string
    handleClickSelected: (id: string) => void
}


interface ModalServicioProps {
    servicio: {
        id: number;
        name: string;
        description: string;
        img: string;
    };
}

interface CardServicioProps {
    servicio: {
        id: number;
        name: string;
        description: string;
        img: string;
    };
    index: number;
}

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
    clases?: string;
    modalId?: string; // ID de esta modal
    activeId?: string | null; // ID de la modal activa global
}

interface AnimatedSelectProps {
    name: string;
    options: string[];
    onChange?: (value: string) => void;
}