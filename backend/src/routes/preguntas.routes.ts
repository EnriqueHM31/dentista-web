
import { Router } from 'express';
import { ControllerPreguntas } from '../controllers/preguntas';
export const PreguntasRoutes = Router();

PreguntasRoutes.get('/', ControllerPreguntas.getAll);

PreguntasRoutes.post('/', ControllerPreguntas.createPregunta);

PreguntasRoutes.put('/:id', ControllerPreguntas.updatePregunta);

PreguntasRoutes.delete('/:id', ControllerPreguntas.deletePregunta);