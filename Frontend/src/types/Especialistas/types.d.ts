import { Dispatch, SetStateAction } from "react";
import type { UUID } from "../types";

export interface EspecialistasContextProps {
    especialistas: EspecialistaProps[];
    setEspecialistas: Dispatch<SetStateAction<EspecialistaProps[]>>;
    ordenarEspecialistas: (especialistas: EspecialistaProps[]) => EspecialistaProps[];
    refrescarEspecialistasEditar: (id: UUID, cambios: Partial<EspecialistaProps>) => void;
    refrescarEspecialistasEliminar: (id: UUID) => void;
    refrescarEspecialistasCrear: (especialistaCreado: EspecialistaProps) => void;
}

export interface EspecialistaProps {
    id: UUID;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    avatar: string;
    linkedin: string;
    servicio: string;
}

export interface EspecialistaEditarProps extends Partial<EspecialistaProps> {
    id_servicio: UUID;
}

export type FormCrearEspecialistaProps = Omit<EspecialistaProps, "id">

export type InitialEspecialistaProps = Omit<FormCrearEspecialistaProps, "servicio">


export interface PropsHookEspecialistas {
    especialistas: EspecialistaProps[];
    toggle: (id: string) => void;
    handleClickDesactivarModal: () => void;
}


// LOGIN ----------------------------------------------
export interface EspecialistasCardProps {
    handleOpen: (especialista: Especialista, modal: string) => void;
    handleDelete: (especialista: Especialista) => void;
    especialista: Especialista;
}

export interface PropsModalCrearEspecialista {
    handleClickDesactivarModal: () => void;
    handleCrearEspecialista: (e: React.FormEvent) => void;
    handleChangeCrearEspecialista: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface PropsModalEditarEspecialista {
    toggle: () => void;
    especialistaSeleccionado: Especialista | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleEditarEspecialista: (e: React.FormEvent, id: UUID) => void;
}