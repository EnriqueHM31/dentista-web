import { Request, Response } from 'express';
import { ModeloServicio } from '../models/mysql/servicio';
import { validarEditarServicio, validarId, validarServicio } from '../utils/Validacion';


export class ServiciosController {

    static async crearServicio(req: Request, res: Response) {

        const result = validarServicio(req.body);

        if (result.error) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { success, message, servicio } = await ModeloServicio.crearServicio({ ...result.data });

        if (success) {
            res.status(200).json({ success, message, servicio });
        } else {
            res.status(500).json({ success, message, servicio: {} });
        }
    }

    static async getServicios(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloServicio.getServicios();

            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
        }
    }

    static async getDisponibles(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloServicio.getDisponibles();

            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
        }
    }

    static async updateServicio(req: Request, res: Response) {
        const id = req.params.id as `${string}-${string}-${string}-${string}-${string}`;

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }

        const result = validarEditarServicio(req.body);

        if (result.error) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { success, message, cambios } = await ModeloServicio.updateServicio(resultID.data.id, { ...result.data });

        if (success) {
            res.status(200).json({ success, message, cambios });
        } else {
            res.status(500).json({ success, message, cambios });
        }
    }

    static async deleteServicio(req: Request, res: Response) {
        const id = req.params.id as `${string}-${string}-${string}-${string}-${string}`;

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }

        const { success, message } = await ModeloServicio.deleteServicio(resultID.data.id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }


}