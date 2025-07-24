import { Router } from 'express';
import { CitasController } from '@/controllers/cita';
import { verificarTokenDesdeCookie } from '@/middleware/verificarToken';

export const CitasRouter = Router();

CitasRouter.get('/', CitasController.getAll);
CitasRouter.post('/', verificarTokenDesdeCookie, CitasController.createCita);
CitasRouter.delete('/:id', verificarTokenDesdeCookie, CitasController.deleteCita);

