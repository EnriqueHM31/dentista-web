import type { Servicio, LinksNavegacionProps } from "@/types";
import IMAGENTRATAMIENTO from "@/assets/servicios/tratamiento.webp";
import IMAGENSONRISA from "@/assets/servicios/sonrisa.webp";
import IMAGENIMPLANTE from "@/assets/servicios/implante.webp";
import type { Variants } from "framer-motion";


export const LINKS_NAVEGACION = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre nosotros', path: '/sobre-nosotros' },
    { name: 'Contacto', path: '/contacto' },
] as LinksNavegacionProps[];


export const SERVICIOS_DATA = [
    {
        name: "Tratamiento de Conducto",
        description:
            "El tratamiento de conducto (endodoncia) es un procedimiento dental utilizado para tratar infecciones en el centro de un diente",
        img: IMAGENTRATAMIENTO,
    },
    {
        name: "Dentista Cosmético",
        description:
            "La odontología cosmética es la rama de la odontología que se enfoca en mejorar la apariencia de tu sonrisa",
        img: IMAGENSONRISA,
    },
    {
        name: "Implantes Dentales",
        description:
            "Un implante dental es una raíz artificial que se coloca en tu mandíbula para sostener un diente protésico o un puente",
        img: IMAGENIMPLANTE,
    },
] as Servicio[];


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