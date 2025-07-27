import { RowDataPacket } from 'mysql2';
import { UUID } from './types';
export interface CitaProps {
    id: UUID;
    nombre: string;
    email: string;
    mensaje: string;
    telefono: string;
    servicio: UUID
    comentarios: string;
    fecha: string;
    hora: string;
    completado: boolean;
}

export interface CitaResponseProps extends RowDataPacket, CitaProps { }


export interface CitaEditarProps {
    id: UUID;
    completado: boolean;
};

export type CitaCrearProps = Omit<CitaProps, 'id'>;

