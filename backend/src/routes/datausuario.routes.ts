import { Router } from 'express';
import { ContrallerUsuario } from '../controllers/usuario';

export const UsuarioRouter = Router();


UsuarioRouter.get('/', ContrallerUsuario.getUsuario);

UsuarioRouter.put('/', ContrallerUsuario.updateUsuario);