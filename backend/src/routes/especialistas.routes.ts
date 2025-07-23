import { Router } from 'express';
import { ControllerEspecialistas } from '@/controllers/especialista';
import { verificarTokenDesdeCookie } from '@/middleware/verificarToken';

export const EspecialistasRouter = Router();

EspecialistasRouter.get('/', verificarTokenDesdeCookie, ControllerEspecialistas.getAll);
EspecialistasRouter.post('/', ControllerEspecialistas.createEspecialista);
EspecialistasRouter.patch('/:id', ControllerEspecialistas.updateEspecialista);
EspecialistasRouter.delete('/:id', ControllerEspecialistas.deleteEspecialista);