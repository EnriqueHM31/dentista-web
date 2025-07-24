
import { Request, Response } from 'express';
import { ModeloCita } from '@/models/mysql/citas';
import { validarId } from '@/utils/Validacion';

export class CitasController {

    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloCita.getAll();

            if (success) {
                res.status(200).json({ success, message });
            } else {
                res.status(500).json({ success, message });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las citas' });
        }
    }

    static async createCita(req: Request, res: Response) {
        const { nombre, email, mensaje, avatar, servicio, comentario, fecha, hora } = req.body;

        const { success, message, cita } = await ModeloCita.createCita({ nombre, email, mensaje, avatar, servicio, comentario, fecha, hora });

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }

    static async deleteCita(req: Request, res: Response) {
        const id = req.params.id as `${string}-${string}-${string}-${string}-${string}`;

        const result = validarId({ id });
        if (result.error) {
            res.status(400).json({ success: false, message: result.error.message });
            return;
        }

        const { success, message } = await ModeloCita.deleteCita(result.data.id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}   