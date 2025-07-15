import { Request, Response } from 'express';
import { ModeloServicio } from '../models/mysql/servicio';


export class ServiciosController {

    static async crearServicio(req: Request, res: Response) {
        const { titulo, descripcion, img, duration } = req.body;

        const { success, message, servicio } = await ModeloServicio.crearServicio({ titulo, descripcion, img, duration });

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

    static async updateServicio(req: Request, res: Response) {
        const data = req.body;
        const id = req.params.id

        const { success, message } = await ModeloServicio.updateServicio(id, data);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async deleteServicio(req: Request, res: Response) {
        const id = req.params.id
        const { success, message } = await ModeloServicio.deleteServicio(id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }


}