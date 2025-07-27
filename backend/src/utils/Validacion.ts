import { UUID } from '@/types/types';
import { z } from 'zod';
export class Validacion {
    static idsObjetos = z.object({
        id: z.string().min(1, { message: "El id es requerido" }),
    })


    static comentario = z.object({
        nombre: z.string()
            .min(1, { message: "El nombre es requerido" }),
        ranking: z.number()
            .min(1, { message: "El ranking es requerido" })
            .max(5, { message: "El ranking debe ser entre 1 y 5" }),
        email: z.string(),
        servicio: z.string(),
        mensaje: z.string().min(1, { message: "El comentario es requerido" }),
    })

    static comentarioEditar = z.object({
        visible: z.boolean(),
    })


    static servicio = z.object({
        titulo: z.string().min(1, { message: "El titulo es requerido" }),
        descripcion: z.string().min(1, { message: "La descripción es requerida" }),
        img: z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
        duration: z.number().min(1, { message: "La duración es requerida" }).int({ message: "La duración debe ser un número entero" }),
    })

    static especialista = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        apellido: z.string().min(1, { message: "El apellido es requerido" }),
        email: z.string(),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        direccion: z.string().min(1, { message: "La dirección es requerida" }),
        avatar: z.string().min(1, { message: "La imagen es requerida" }).startsWith("https://"),
        linkedin: z.string().min(1, { message: "La referencia es requerida" }).startsWith("https://"),
    })

    static pregunta = z.object({
        pregunta: z.string().min(1, { message: "La pregunta es requerida" }),
        respuesta: z.string().min(1, { message: "La respuesta es requerida" }),
    })

    static user = z.object({
        username: z.string().min(1, { message: "El nombre de usuario es requerido" }),
        password: z.string().min(1, { message: "La contraseña es requerida" }),
    })
}

export function validarId(data: { id: UUID }) {
    return Validacion.idsObjetos.safeParse(data);
}

export function validarComentario(data: { username: string, ranking: number, email: string, categoria: string, comentario: string }) {
    return Validacion.comentario.safeParse(data);
}

export function validarServicio(data: { nombre: string, descripcion: string, imagen: string }) {
    return Validacion.servicio.safeParse(data);
}

export function validarEditarServicio(data: { nombre: string, descripcion: string, imagen: string }) {
    return Validacion.servicio.partial().safeParse(data);
}

export function validarPregunta(data: { pregunta: string, respuesta: string }) {
    return Validacion.pregunta.safeParse(data);
}

export function validarEditarPregunta(data: { pregunta: string, respuesta: string }) {
    return Validacion.pregunta.partial().safeParse(data);
}

export function validarEditarUsuario(data: { username: string, password: string }) {
    return Validacion.user.partial().safeParse(data);
}

export function validarComentarioEditar(data: { visible: boolean }) {
    return Validacion.comentarioEditar.safeParse(data);
}

