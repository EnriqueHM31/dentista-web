import type { ServicioCrearProps, ServicioProps } from "@/types/Servicios/types";
import type { UUID } from "@/types/types";

export const INITIAL_SERVICIO_PROPS: ServicioCrearProps = {
    titulo: "",
    descripcion: "",
    img: "",
    duration: 0
}
export const INITIAL_SERVICIO_PROPS_WITH_ID: ServicioProps = {
    id: "" as UUID,
    titulo: "",
    descripcion: "",
    img: "",
    duration: 0
}

export const KEY_SERVICIOS = {
    titulo: "titulo",
    descripcion: "descripcion",
    img: "img",
    duration: "duration",
} as const

export const OPCIONES_EDITAR_SERVICIO = [
    { label: "Nombre", value: "titulo" },
    { label: "Descripción", value: "descripcion" },
    { label: "Imagen", value: "img" },
    { label: "Duración", value: "duration" },
];
