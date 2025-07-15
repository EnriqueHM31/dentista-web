import { Router } from 'express';
import { ControllerEspecialistas } from '../controllers/especialista';

export const EspecialistasRouter = Router();

EspecialistasRouter.get('/', ControllerEspecialistas.getAll);
EspecialistasRouter.post('/', ControllerEspecialistas.createEspecialista);
EspecialistasRouter.put('/:id', ControllerEspecialistas.updateEspecialista);