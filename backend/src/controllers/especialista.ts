import { Request, Response } from 'express';
import { ModeloEspecialista } from '@/models/mysql/especialista';
import { validarId } from '@/utils/Validacion';

export class ControllerEspecialistas {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloEspecialista.getAll();

            if (success) {
                res.status(200).json({ success, message });
            } else {
                res.status(500).json({ success, message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }



    static async createEspecialista(req: Request, res: Response) {
        const { nombre, apellido, email, telefono, direccion, avatar, nivel, servicio, linkedin } = req.body;

        const { success, message, especialista } = await ModeloEspecialista.createEspecialista({ nombre, apellido, email, telefono, direccion, avatar, nivel, servicio, linkedin });

        if (success) {
            res.status(200).json({ success, message, especialista });
        } else {
            res.status(500).json({ success, message, especialista: {} });
        }
    }



    static async updateEspecialista(req: Request, res: Response) {
        const { nombre, apellido, email, telefono, direccion, avatar, servicio, linkedin } = req.body;

        const { id } = req.params as { id: `${string}-${string}-${string}-${string}-${string}` };
        const result = validarId({ id });
        if (result.error) {
            res.status(400).json({ success: false, message: result.error.message });
            return;
        }

        const data = { nombre, apellido, email, telefono, direccion, avatar, servicio, linkedin };

        const { success, message, cambios } = await ModeloEspecialista.updateEspecialista(result.data.id, data);

        if (success) {
            res.status(200).json({ success, message, cambios });
        } else {
            res.status(500).json({ success, message, cambios });
        }
    }

    static async deleteEspecialista(req: Request, res: Response) {
        const id = req.params.id as `${string}-${string}-${string}-${string}-${string}`;

        const result = validarId({ id });
        if (result.error) {
            res.status(400).json({ success: false, message: result.error.message });
            return;
        }

        const { success, message } = await ModeloEspecialista.deleteEspecialista(result.data.id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}