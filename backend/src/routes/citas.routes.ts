import { Router } from 'express';
import { CitasController } from '@/controllers/cita';
import { verificarTokenDesdeCookie } from '@/middleware/verificarToken';

export const CitasRouter = Router();

CitasRouter.get('/', CitasController.getAll);
CitasRouter.post('/', CitasController.createCita);
CitasRouter.patch('/:id', verificarTokenDesdeCookie, CitasController.updateCita);
CitasRouter.delete('/:id', verificarTokenDesdeCookie, CitasController.deleteCita);

