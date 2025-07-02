import type { Request, Response } from 'express';
import { ModeloContacto } from '../../models/local/contacto';

export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {
        const { username, email, categoria, message: mensaje } = req.body;

        if (!username || !email || !mensaje || !categoria) {
            res.status(400).json({ error: 'Faltan datos' });
        }

        const { success, message } = await ModeloContacto.EnviarMensaje(username, email, categoria, mensaje);

        if (success) {
            res.status(200).json({ message });
        } else {
            res.status(500).json({ message });
        }
    }
}
