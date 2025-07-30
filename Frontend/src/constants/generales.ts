import type { LinksNavegacionProps } from "@/types/Menu/types";
import type { Variants } from "framer-motion";

export const LINKS_NAVEGACION = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
] as LinksNavegacionProps[];


export const MINUTOS_ARRAY = ["30", "60", "90", "120", "150", "180", "210", "240", "270", "300"];

export const VARIANTES_MENU = {
    hidden: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeInOut' },
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeInOut' },
    },
} as Variants;

export const VENTAJAS = [
    {
        name: "Equipo dental de primera calidad",
    },
    {
        name: "Servicios dentales de vanguardia",
    },
    {
        name: "Descuento en todos los tratamientos dentales",
    },
    {
        name: "Inscripción rápida y sencilla",
    }
];
