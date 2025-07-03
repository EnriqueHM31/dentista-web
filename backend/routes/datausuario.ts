import { Router } from 'express';
import { ContrallerUsuario } from '../controllers/local/usuario';

export const UsuarioRouter = Router();

UsuarioRouter.put('/:id', ContrallerUsuario.updateUsuario);