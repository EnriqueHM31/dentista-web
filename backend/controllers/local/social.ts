import { ModeloSocial } from '../../models/mysql/social';
import { Request, Response } from 'express';

export class ContrallerSocial {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloSocial.getAll();

            if (success) {
                res.status(200).json({ message });
            } else {
                res.status(500).json({ message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }

    static async updateSocial(req: Request, res: Response) {
        const { referencia } = req.body;
        const { id } = req.params;

        if (!id || !referencia) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloSocial.updateSocial(id, referencia);

        if (success) {
            res.status(200).json({ message });
        } else {
            res.status(500).json({ message });
        }
    }

}
