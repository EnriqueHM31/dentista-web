import type { Servicio, LinksNavegacionProps, SlideData } from "@/types";
import IMAGENTRATAMIENTO from "@/assets/servicios/tratamiento.webp";
import IMAGENSONRISA from "@/assets/servicios/sonrisa.webp";
import IMAGENIMPLANTE from "@/assets/servicios/implante.webp";

import ESPECIALISTA1 from "@/assets/especialistas/especialista1.webp";
import ESPECIALISTA2 from "@/assets/especialistas/especialista2.webp";
import ESPECIALISTA3 from "@/assets/especialistas/especialista3.webp";

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


export const DATASLIDERESPECIALISTAS = [
    {
        title: "Dra. Mariana López Ramírez",
        descripcion: "Odontólogo General",
        src: ESPECIALISTA1,
        linkedin: "https://www.linkedin.com/in/marianalopezram%C3%ADrez/",
    },
    {
        title: "Dr. José Antonio Méndez",
        descripcion: "Especialista en Ortodoncia",
        src: ESPECIALISTA2,
        linkedin: "https://www.linkedin.com/in/dr-jose-antonio-mendez-a%C3%B1os/",
    },
    {
        title: "Dra. Laura Fernández Soto",
        descripcion: "Higienista Dental",
        src: ESPECIALISTA3,
        linkedin: "https://www.linkedin.com/in/laura-fernandez-soto-a%C3%B1os/",
    },
    {
        title: "Lic. Sofía Aguilar Torres",
        descripcion: "Recepcionista",
        src: ESPECIALISTA1,
        linkedin: "https://www.linkedin.com/in/sofia-aguilar-torres-a%C3%B1os/",
    },
    {
        title: "Téc. Carlos Gómez Ruiz",
        descripcion: "Técnico en Prótesis Dental",
        src: ESPECIALISTA2,
        linkedin: "https://www.linkedin.com/in/carlos-g%C3%B3mez-ruiz-a%C3%B1os/",
    },
    {
        title: "Asist. Daniela Pérez Medina",
        descripcion: "Asistente Dental",
        src: ESPECIALISTA3,
        linkedin: "https://www.linkedin.com/in/daniela-perez-medina-a%C3%B1os/",
    },
] as SlideData[];