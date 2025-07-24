export interface Cita {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    telefono: string;
    servicio: `${string}-${string}-${string}-${string}-${string}`;
    comentarios: string;
    fecha: string;
    hora: string;
}

export interface CitaCrear extends Omit<Cita, 'id'> {
    id: string; // o id?: string; si quieres que sea opcional
}