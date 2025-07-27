import { ModeloSocial } from '@/models/MySQL/social';
import { UUID } from '@/types/types';
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

        const resultDataIdModificarSocial = validarId(req.params as { id: UUID });
        if (resultDataIdModificarSocial.error) {
            res.status(400).json({ success: false, message: resultDataIdModificarSocial.error.message });
            return;
        }

        if (!referencia) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const idSocialModificar = resultDataIdModificarSocial.data.id;

        const { success, message } = await ModeloSocial.updateSocial(idSocialModificar, referencia);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

}
