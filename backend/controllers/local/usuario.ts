import { Request, Response } from 'express'
import { ModeloUsuario } from '../../models/mysql/usuario';

export class ContrallerUsuario {


    static async getUsuario(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloUsuario.getUsuario();

            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
    }

    static async updateUsuario(req: Request, res: Response) {
        const { username, password } = req.body;

        const { success, message } = await ModeloUsuario.updateUsuario(username, password);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }



}