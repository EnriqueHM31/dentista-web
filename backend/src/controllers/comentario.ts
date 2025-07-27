import type { Request, Response } from 'express';
import { ModeloContacto } from '@/models/MySQL/comentario';
import { validarComentario, validarId } from '@/utils/Validacion';
import type { Comentario } from '@/types/comentario';
import { UUID } from 'crypto';


export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {

        const result = validarComentario(req.body);

        if (!result.success) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { nombre, ranking, email, servicio, mensaje } = result.data

        const { success, message } = await ModeloContacto.EnviarMensaje({ nombre, ranking, email, servicio, mensaje } as Comentario);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async getComentarios(_req: Request, res: Response) {
        const { success, message } = await ModeloContacto.getComentarios();

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }


    static async getComentariosVisibles(_req: Request, res: Response) {
        const { success, message } = await ModeloContacto.getComentariosVisibles();

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }


    static async updateComentario(req: Request, res: Response) {
        const { visible } = req.body as { visible: boolean };
        const { id } = req.params as { id: UUID };

        const dataIdEditarComentario = validarId({ id });
        if (dataIdEditarComentario.error) {
            res.status(400).json({ success: false, message: dataIdEditarComentario.error.message });
            return;
        }

        const idComentarioModificar = dataIdEditarComentario.data.id;

        const { success, message, comentario } = await ModeloContacto.updateComentario(idComentarioModificar, visible);

        if (success) {
            res.status(200).json({ success, message, comentario });
        } else {
            res.status(500).json({ success, message, comentario: {} });
        }
    }


    static async deleteComentario(req: Request, res: Response) {
        const { id } = req.params as { id: UUID };

        const dataIdEliminarComentario = validarId({ id });
        if (dataIdEliminarComentario.error) {
            res.status(400).json({ success: false, message: dataIdEliminarComentario.error.message });
            return;
        }

        const idComentarioEliminar = dataIdEliminarComentario.data.id;

        const { success, message } = await ModeloContacto.deleteComentario(idComentarioEliminar); // id del comentario
        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }



}
