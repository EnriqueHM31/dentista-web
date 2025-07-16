import { ModeloPreguntas } from '@/models/mysql/preguntas';
import { validarEditarPregunta, validarId, validarPregunta } from '@/utils/Validacion';
import { Request, Response } from 'express';

interface Pregunta {
    pregunta: string;
    respuesta: string;
}

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

        const result = validarPregunta(req.body);

        if (result.error) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
        }


        const { success, message, pregunta } = await ModeloPreguntas.createPregunta({ ...result.data } as Pregunta);

        if (success) {
            res.status(200).json({ success, message, pregunta });
        } else {
            res.status(500).json({ success, message, pregunta: {} });
        }
    }

    static async updatePregunta(req: Request, res: Response) {

        const result = validarEditarPregunta(req.body);
        const { id } = req.params as { id: `${string}-${string}-${string}-${string}-${string}` };

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }

        if (result.error) {
            res.status(400).json({ success: false, message: JSON.parse(result.error.message) });
            return;
        }

        const { success, message } = await ModeloPreguntas.updatePregunta(resultID.data.id, { ...result.data });

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async deletePregunta(req: Request, res: Response) {
        const { id } = req.params as { id: `${string}-${string}-${string}-${string}-${string}` };

        const resultID = validarId({ id });
        if (resultID.error) {
            res.status(400).json({ success: false, message: resultID.error.message });
            return;
        }


        if (!id) {
            res.status(400).json({ success: false, message: 'Faltan datos' });
        }

        const { success, message } = await ModeloPreguntas.deletePregunta(resultID.data.id);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}