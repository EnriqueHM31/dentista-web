import { Request, Response } from 'express';
import { ModeloServicio } from '../../models/mysql/servicio';


export class ServiciosController {
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
            console.error('Error al obtener los servicios:', error);
            res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
        }
    }
}