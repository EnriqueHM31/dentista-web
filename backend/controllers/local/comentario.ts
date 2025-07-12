import type { Request, Response } from 'express';
import { ModeloContacto } from '../../models/local/comentario';

export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {
        const { username, ranking, email, categoria, comentario } = req.body;
        console.log(comentario)

        if (!username || !email || !comentario || !categoria || !ranking) {
            res.status(400).json({ error: `Faltan datos ${username} ${ranking} ${email} ${categoria} ${comentario}` });
        }

        const { success, message } = await ModeloContacto.EnviarMensaje(username, ranking, email, categoria, comentario);

        if (success) {
            res.status(200).json({ message });
        } else {
            res.status(500).json({ message });
        }
    }
}
