import { ModeloSocial } from '@/models/mysql/social';
import { validarId } from '@/utils/Validacion';
import { Request, Response } from 'express';

export class ContrallerSocial {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloSocial.getAll();

            if (success) {
                res.status(200).json({ success, message });
            } else {
                res.status(500).json({ success, message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }

    static async updateSocial(req: Request, res: Response) {
        const { referencia } = req.body;
        const { id } = req.params as { id: `${string}-${string}-${string}-${string}-${string}` };

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }

        if (!id || !referencia) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloSocial.updateSocial(resultID.data.id, referencia);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

}
