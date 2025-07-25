
export interface EspecialistasContextProps {
    especialistas: EspecialistaProps[];
    setEspecialistas: Dispatch<SetStateAction<EspecialistaProps[]>>;
    ordenarEspecialistas: (especialistas: EspecialistaProps[]) => EspecialistaProps[];
}

export interface EspecialistaProps {
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

interface PropsModalCrearEspecialista {
    handleClickDesactivarModal: () => void;
    handleCrearEspecialista: (e: React.FormEvent) => void;
    handleChangeCrearEspecialista: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface PropsModalEditarEspecialista {
    toggle: () => void;
    especialistaSeleccionado: Especialista | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleEditarEspecialista: (e: React.FormEvent, id: `${string}-${string}-${string}-${string}-${string}`) => void;
}