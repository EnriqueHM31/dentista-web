import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface ServicioContextType {
    servicios: ServicioProps[];
    setServicios: Dispatch<SetStateAction<ServicioProps[]>>;
    serviciosDisponibles: ServicioProps[];
    setServiciosDisponibles: Dispatch<SetStateAction<ServicioProps[]>>;
    refrescarServiciosCrear: (servicioCreado: ServicioProps) => void;
    refrescarServiciosEditar: (servicioSeleccionado: Partial<ServicioProps>, id: UUID) => void;
    refrescarServiciosEliminar: (id: UUID) => void;
    refrescarServiciosDisponiblesAñadir: (servicioEliminado: ServicioProps) => void;
    refrescarServiciosDisponiblesEliminar: (id: UUID) => void;
}

export interface ServicioCrearProps {
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

export interface ServicioProps extends ServicioCrearProps {
    id: UUID;
}


export interface CardServicioProps {
    servicio: ServicioProps;
    index: number;
}

export interface ModalEditarServicioProps {
    serviciosRef: React.MutableRefObject<ServicioProps[]>;
    handleClickDesactivarModal: () => void;
    formValues: Partial<ServicioProps>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


export interface ModalServicioProps {
    servicio: ServicioCrearProps
}

// LOGIN ----------------------------------------------

export interface ServicioCardProps {
    servicio: Servicio;
    handleEdit: (servicio: Servicio) => void;
    handleEliminarServicio: (id: UUID) => void;
    handleClickActivarModalIndependiente: (modal: string) => void;
}
export interface useEditarServicioProps {
    serviciosRef: React.RefObject<ServicioProps[]>,
    formValues: Partial<ServicioProps>,
    handleClickDesactivarModal: () => void
}


export interface useGetServiciosProps {
    handleClickDesactivarModal: () => void
}

export interface ModalCrearServicioProps {
    handleClickDesactivarModal: () => void,
    handleSubmitCrearServicio: (e: React.FormEvent) => void,
    handledescartarCambiosCrearServicio: (handleClickDesactivarModal: () => void) => void,
    handleCambiarCampoServicio: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    servicioCrear: ServicioCrearProps
}