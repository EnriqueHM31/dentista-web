import { Request, Response } from 'express'
import { ModeloUsuario } from '@/models/MySQL/usuario';
import { validarEditarUsuario } from '@/utils/Validacion';

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
        const result = validarEditarUsuario(req.body);

        if (result.error) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { success, message } = await ModeloUsuario.updateUsuario({ ...result.data } as { username: string, password: string });

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }



}