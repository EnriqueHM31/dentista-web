
export interface ServicioContextType {
    servicios: ServicioProps[];
    setServicios: Dispatch<SetStateAction<ServicioProps[]>>;
    serviciosDisponibles: ServicioProps[];
    setServiciosDisponibles: Dispatch<SetStateAction<ServicioProps[]>>;
}

export interface ServicioCrearProps {
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

export interface ServicioProps extends ServicioCrearProps {
    id: `${string}-${string}-${string}-${string}-${string}`;
}


export interface CardServicioProps {
    servicio: ServicioCrearProps;
    index: number;
}

export interface ModalEditarServicioProps {
    serviciosRef: React.MutableRefObject<ServicioProps[]>;
    handleClickDesactivarModal: () => void;
    formValues: ServicioProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


export interface ModalServicioProps {
    servicio: ServicioCrearProps
}

// LOGIN ----------------------------------------------

interface ServicioCardProps {
    servicio: Servicio;
    handleEdit: (servicio: Servicio) => void;
    handleEliminarServicio: (id: `${string}-${string}-${string}-${string}-${string}`) => void;
    handleClickActivarModalIndependiente: (modal: string) => void;
}
interface useEditarServicioProps {
    serviciosRef: React.RefObject<ServicioProps[]>,
    formValues: ServicioCrearProps,
    handleClickDesactivarModal: () => void
}


interface useGetServiciosProps {
    handleClickDesactivarModal: () => void
}

interface ModalCrearServicioProps {
    handleClickDesactivarModal: () => void,
    handleSubmitCrearServicio: (e: React.FormEvent) => void,
    handledescartarCambiosCrearServicio: (handleClickDesactivarModal: () => void) => void,
    handleCambiarCampoServicio: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    servicioCrear: ServicioCrearProps
}