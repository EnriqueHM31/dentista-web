import type { LinksNavegacionProps, SlideData } from "@/types";
import ESPECIALISTA1 from "@/assets/especialistas/especialista1.webp";
import ESPECIALISTA2 from "@/assets/especialistas/especialista2.webp";
import ESPECIALISTA3 from "@/assets/especialistas/especialista3.webp";

import type { Variants } from "framer-motion";


export const LINKS_NAVEGACION = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
] as LinksNavegacionProps[];

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


export const TESTIMONIOS = [
    {
        client_name: "María González",
        rating: 5,
        comment:
            "El servicio fue excepcional. Me acompañaron durante todo el proceso y resolvieron todas mis dudas con mucha paciencia.",
    },
    {
        client_name: "Luis Ramírez",
        rating: 4,
        comment:
            "Muy buena atención y materiales de calidad. Solo mejoraría un poco los tiempos de respuesta.",
    },
    {
        client_name: "Andrea López",
        rating: 5,
        comment:
            "¡Excelente experiencia! Todo fue muy profesional y el resultado superó mis expectativas.",
    },
    {
        client_name: "Carlos Méndez",
        rating: 3,
        comment:
            "Buena atención, aunque sentí que podrían mejorar algunos detalles en la entrega.",
    },
    {
        client_name: "Fernanda Castro",
        rating: 4,
        comment:
            "Me gustó mucho el trato del personal y la calidad de los productos. Sin duda volveré.",
    },
    {
        client_name: "Carlos Méndez",
        rating: 3,
        comment:
            "Buena atención, aunque sentí que podrían mejorar algunos detalles en la entrega.",
    },
    {
        client_name: "Fernanda Castro",
        rating: 4,
        comment:
            "Me gustó mucho el trato del personal y la calidad de los productos. Sin duda volveré.",
    },
    {
        client_name: "Carlos Méndez",
        rating: 3,
        comment:
            "Buena atención, aunque sentí que podrían mejorar algunos detalles en la entrega.",
    },
    {
        client_name: "Fernanda Castro",
        rating: 4,
        comment:
            "Me gustó mucho el trato del personal y la calidad de los productos. Sin duda volveré.",
    },
    {
        client_name: "Carlos Méndez",
        rating: 3,
        comment:
            "Buena atención, aunque sentí que podrían mejorar algunos detalles en la entrega.",
    },
    {
        client_name: "Fernanda Castro",
        rating: 4,
        comment:
            "Me gustó mucho el trato del personal y la calidad de los productos. Sin duda volveré.",
    },

];


interface FAQItem {
    pregunta: string;
    respuesta: string;
}

export const PREGUNTASFRECUENTES: FAQItem[] = [
    {
        pregunta: "¿Puedo ver quién lee mis campañas de correo electrónico?",
        respuesta: "Sí, nuestro sistema incluye analytics avanzados que te permiten ver quién abre tus emails, cuándo lo hicieron y qué enlaces han clickeado."
    },
    {
        pregunta: "¿Ofrecen descuentos para organizaciones sin fines de lucro?",
        respuesta: "Sí, ofrecemos un 20% de descuento para ONGs registradas. Envíanos tu certificado de organización sin fines de lucro para aplicar al descuento."
    },
    {
        pregunta: "¿Qué métodos de pago aceptan?",
        respuesta: "Aceptamos todas las tarjetas principales (Visa, Mastercard, Amex), transferencias bancarias, PayPal y criptomonedas seleccionadas."
    },
    {
        pregunta: "¿Cuál es su política de devoluciones?",
        respuesta: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su estado original y con su empaque completo."
    },
    {
        pregunta: "¿Tienen soporte técnico 24/7?",
        respuesta: "Ofrecemos soporte técnico por chat y email de lunes a viernes de 8am a 6pm. Para emergencias fuera de este horario, contamos con un servicio premium adicional."
    },
    {
        pregunta: "¿Tienen soporte técnico 24/7?",
        respuesta: "Ofrecemos soporte técnico por chat y email de lunes a viernes de 8am a 6pm. Para emergencias fuera de este horario, contamos con un servicio premium adicional."
    }
];

