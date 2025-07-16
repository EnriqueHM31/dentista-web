import type { Request, Response } from 'express';
import { ModeloContacto } from '../models/local/comentario';
import { validarComentario } from '../../utils/Validacion';

export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {

        const result = validarComentario(req.body);

        if (!result.success) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { success, message } = await ModeloContacto.EnviarMensaje({ ...result.data });

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
        const { visible } = req.body;
        const id = req.params.id
        const { success, message } = await ModeloContacto.updateComentario(id, visible);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }


    static async deleteComentario(req: Request, res: Response) {
        const id = req.params.id
        const { success, message } = await ModeloContacto.deleteComentario(id); // id del comentario
        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }



}
