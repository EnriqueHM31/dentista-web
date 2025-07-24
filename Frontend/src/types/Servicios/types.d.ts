
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
    serviciosRef: React.MutableRefObject<ServicioCrearProps[]>;
    handleClickDesactivarModal: () => void;
    formValues: ServicioCrearProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


export interface ModalServicioProps {
    servicio: ServicioCrearProps
}