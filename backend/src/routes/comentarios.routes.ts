import { Router } from 'express';
import { ContrallerContacto } from '../controllers/comentario';

export const ComentariosRouter = Router();

ComentariosRouter.post('/', ContrallerContacto.EnviarMensaje)

ComentariosRouter.get('/', ContrallerContacto.getComentarios)

ComentariosRouter.get('/visibles', ContrallerContacto.getComentariosVisibles)

ComentariosRouter.put('/:id', ContrallerContacto.updateComentario)