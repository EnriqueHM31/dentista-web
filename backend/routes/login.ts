import { Router } from 'express';
import { ControllerLogin } from '../controllers/local/login';

export const LoginRouter = Router();

LoginRouter.get('/verify', ControllerLogin.VerificarSesion);
LoginRouter.post('/', ControllerLogin.InicioSesion);
