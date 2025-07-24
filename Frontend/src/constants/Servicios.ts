import type { ServicioCrearProps, ServicioProps } from "@/types/Servicios/types";

export const INITIAL_SERVICIO_PROPS: ServicioCrearProps = {
    titulo: "",
    descripcion: "",
    img: "",
    duration: 0
}
export const INITIAL_SERVICIO_PROPS_WITH_ID: ServicioProps = {
    id: "" as `${string}-${string}-${string}-${string}-${string}`,
    titulo: "",
    descripcion: "",
    img: "",
    duration: 0
} 