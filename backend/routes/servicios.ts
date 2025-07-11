import { Router } from 'express'
import { ServiciosController } from '../controllers/local/servicio'

export const ServiciosRoutes = Router()

ServiciosRoutes.post('/', ServiciosController.crearServicio)

ServiciosRoutes.get('/', ServiciosController.getServicios)

ServiciosRoutes.put('/:id', ServiciosController.updateServicio)

ServiciosRoutes.delete('/:id', ServiciosController.deleteServicio)



