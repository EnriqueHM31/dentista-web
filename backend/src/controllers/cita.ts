
import { Request, Response } from 'express';
import { ModeloCita } from '@/models/MySQL/citas';
import { validarId } from '@/utils/Validacion';
import { CitaCrear } from '@/types/citas';
import { UUID } from '@/types/types';

export class CitasController {

    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message, citas } = await ModeloCita.getAll();

            if (success) {
                res.status(200).json({ success, message, citas });
            } else {
                res.status(500).json({ success, message, citas: [] });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las citas' });
        }
    }

    static async createCita(req: Request, res: Response) {
        const { nombre, email, mensaje, telefono, servicio, comentarios, fecha, hora } = req.body;
        console.log(req.body)

        const { success, message, cita } = await ModeloCita.createCita({ nombre, email, mensaje, telefono, servicio, comentarios, fecha, hora } as CitaCrear);

        if (success) {
            res.status(200).json({ success, message, cita });
        } else {
            res.status(500).json({ success, message, cita: {} });
        }
    }

    static async deleteCita(req: Request, res: Response) {
        const { id } = req.params as { id: UUID };

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

    static async updateCita(req: Request, res: Response) {
        const { completada } = req.body as { completada: boolean };
        const { id } = req.params as { id: UUID };

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }

        const { success, message } = await ModeloCita.updateCita(resultID.data.id, { completado: completada });

        if (success) {
            res.status(200).json({ success, message });
        }
    }
}