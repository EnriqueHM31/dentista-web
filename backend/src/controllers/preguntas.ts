import { ModeloPreguntas } from '@/models/mysql/preguntas';
import { Request, Response } from 'express';

export class ControllerPreguntas {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message } = await ModeloPreguntas.getAll();

            if (success) {
                res.status(200).json({ success, message });
            } else {
                res.status(500).json({ message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
        }
    }

    static async createPregunta(req: Request, res: Response) {
        const { pregunta, respuesta } = req.body;

        if (!pregunta || !respuesta) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloPreguntas.createPregunta(pregunta, respuesta);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async updatePregunta(req: Request, res: Response) {
        const { pregunta, respuesta } = req.body;
        const { id } = req.params;

        if (!id || !pregunta || !respuesta) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloPreguntas.updatePregunta(id, pregunta, respuesta);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async deletePregunta(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloPreguntas.deletePregunta(id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}