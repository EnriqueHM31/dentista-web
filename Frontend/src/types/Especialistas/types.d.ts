
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