import { z } from "zod";

export class Validacion {
    static idsObjetos = z.object({
        id: z.string().uuid({ message: "El id debe ser un UUID válido" })
    })


    static comentario = z.object({
        username: z.string()
            .min(1, { message: "El nombre es requerido" }),
        ranking: z.number()
            .min(1, { message: "El ranking es requerido" })
            .max(5, { message: "El ranking debe ser entre 1 y 5" }),
        email: z.string(),
        categoria: z.string(),
        comentario: z.string().min(1, { message: "El comentario es requerido" }),
    })


    static servicio = z.object({
        titulo: z.string().min(1, { message: "El titulo es requerido" }),
        descripcion: z.string().min(1, { message: "La descripción es requerida" }),
        img: z.string().min(1, { message: "La imagen es requerida" }).url({ message: "La imagen debe ser una URL válida" }),
        duration: z.number().min(1, { message: "La duración es requerida" }).int({ message: "La duración debe ser un número entero" }),
    })

    static especialista = z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        apellido: z.string().min(1, { message: "El apellido es requerido" }),
        email: z.string().email({ message: "El email debe ser una dirección de correo electrónico válida" }),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        direccion: z.string().min(1, { message: "La dirección es requerida" }),
    })

}

export function validarId(data: { id: `${string}-${string}-${string}-${string}-${string}` }) {
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
