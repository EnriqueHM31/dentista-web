export interface CitaProps {
    id: `${string}-${string}-${string}-${string}-${string}`;
    nombre: string;
    email: string;
    servicio: string;
    telefono: string;
    comentarios: string
    fecha: string;
    hora: string
    completada: boolean
}
export type FormCrearCitaProps = Omit<CitaProps, "id" | "servicio" | "completada">;
