import { Request, Response } from 'express'
import { ModeloUsuario } from '../../models/mysql/usuario';

export class ContrallerUsuario {
    static async updateUsuario(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloUsuario.updateUsuario(username, password);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}