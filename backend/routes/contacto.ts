import { Router } from 'express';
import { ContrallerContacto } from '../controllers/local/contacto';

export const contactoRouter = Router();

contactoRouter.post('/', ContrallerContacto.EnviarMensaje)