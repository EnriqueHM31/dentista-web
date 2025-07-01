import type { Request, Response } from 'express';
import { ModeloContacto } from '../../models/local/contacto';

export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {
        const { nombre, email, interes, mensaje } = req.body;

        if (!nombre || !email || !mensaje || !interes) {
            res.status(400).json({ error: 'Faltan datos' });
        }

        const { success, message } = await ModeloContacto.EnviarMensaje(nombre, email, interes, mensaje);

        if (success) {
            res.status(200).json({ message });
        } else {
            res.status(500).json({ message });
        }
    }
}
