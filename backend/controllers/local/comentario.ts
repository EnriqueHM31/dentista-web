import type { Request, Response } from 'express';
import { ModeloContacto } from '../../models/local/comentario';

export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {
        const { username, ranking, email, categoria, comentario } = req.body;

        if (!username || !email || !comentario || !categoria || !ranking) {
            res.status(400).json({ error: `Faltan datos ${username} ${ranking} ${email} ${categoria} ${comentario}` });
        }

        const { success, message } = await ModeloContacto.EnviarMensaje(username, ranking, email, categoria, comentario);

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



}
