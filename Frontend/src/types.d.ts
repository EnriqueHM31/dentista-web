export interface Servicio {
    id: `${string}-${string}-${string}-${string}-${string}` | "";
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

interface Especialista {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    avatar: string;
    linkedin: string;
    servicio: string;
}

interface Comentario {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    ranking: number;
    visible: boolean | number;
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
    slide: Especialista;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}

interface ModalCrearProps {
    toggle: () => void;
    handleClickDesactivarModal: () => void;
}

interface Pregunta {
    id: `${string}-${string}-${string}-${string}-${string}`;
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
    servicio: ServicioResponse
}

interface CardServicioProps {
    servicio: ServicioResponse;
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
    funcion?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    select?: string;
    name: string;
    options: string[];
    onChange?: (value: string) => void;
    clases?: string;
}

interface ServicioProps {
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

interface ServicioResponse extends ServicioProps {
    id: `${string}-${string}-${string}-${string}-${string}` | "";
}

interface ModalEditarServicioProps {
    serviciosRef: React.MutableRefObject<ServicioResponse[]>;
    handleClickDesactivarModal: () => void;
    formValues: ServicioResponse;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}
