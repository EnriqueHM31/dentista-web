import { Router } from 'express';
import { ContrallerContacto } from '../controllers/local/comentario';

export const ComentariosRouter = Router();

ComentariosRouter.post('/', ContrallerContacto.EnviarMensaje)