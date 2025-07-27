import { ModeloPreguntas } from '@/models/MySQL/preguntas';
import { validarEditarPregunta, validarId, validarPregunta } from '@/utils/Validacion';
import { Request, Response } from 'express';
import type { PreguntaProps, PreguntaEditarProps } from '@/types/pregunta';
import { UUID } from '@/types/types';

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

        const resultDataCrearPregunta = validarPregunta(req.body);

        if (resultDataCrearPregunta.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataCrearPregunta.error.message) });
        }

        const dataCrearPregunta = resultDataCrearPregunta.data as PreguntaProps;

        const { success, message, pregunta } = await ModeloPreguntas.createPregunta(dataCrearPregunta);

        if (success) {
            res.status(200).json({ success, message, pregunta });
        } else {
            res.status(500).json({ success, message, pregunta: {} });
        }
    }

    static async updatePregunta(req: Request, res: Response) {

        const dataEditarPregunta = validarEditarPregunta(req.body);
        const { id } = req.params as { id: UUID };

        const dataIdEditarPregunta = validarId({ id });
        if (dataIdEditarPregunta.error) {
            res.status(400).json({ success: false, message: dataIdEditarPregunta.error.message });
            return;
        }

        if (dataEditarPregunta.error) {
            res.status(400).json({ success: false, message: JSON.parse(dataEditarPregunta.error.message) });
            return;
        }

        const idPreguntaModificar = dataIdEditarPregunta.data.id;
        const preguntaAModificar = dataEditarPregunta.data as PreguntaEditarProps;

        const { success, message } = await ModeloPreguntas.updatePregunta(idPreguntaModificar, preguntaAModificar);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }

    static async deletePregunta(req: Request, res: Response) {
        const { id } = req.params as { id: UUID };

        const dataIdEliminarPregunta = validarId({ id });
        if (dataIdEliminarPregunta.error) {
            res.status(400).json({ success: false, message: dataIdEliminarPregunta.error.message });
            return;
        }

        const idPreguntaEliminar = dataIdEliminarPregunta.data.id;

        const { success, message } = await ModeloPreguntas.deletePregunta(idPreguntaEliminar);

        if (success) {
            res.status(200).json({ success, message });
        } else {
            res.status(500).json({ success, message });
        }
    }
}