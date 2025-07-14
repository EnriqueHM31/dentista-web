import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ModeloLogin } from '../../models/mysql/login';




export const JWT_SECRET = process.env.SECRET ?? (() => {
    throw new Error("SECRET no está definido en .env");
})();

export class ControllerLogin {
    static async InicioSesion(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(200).json({ success: false, message: 'Credenciales incompletas.' });
        }

        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(200).json({ success: false, message: 'Credenciales incorrectas.' });
        }

        try {
            const { success, message, token } = await ModeloLogin.InicioSesion(username, password);

            if (!success) {
                res.status(200).json({ success: false, message: message });
            }

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true en producción con HTTPS
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000, // 1 hora
            });

            res.status(200).json({ success: true, message: 'Sesión iniciada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al iniciar sesión' + error });
        }
    }

    static async VerificarSesion(req: Request, res: Response) {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ success: false, message: 'No autorizado' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { role: string, username: string };
            res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
        } catch (error) {
            res.status(401).json({ success: false, message: 'Token inválido o expirado' });
        }
    }

    static async Autenticacion(req: Request, res: Response) {
        const token = req.cookies.token;

        if (!token) {
            res.status(200).json({ success: false, message: 'No autorizado' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { role: string, username: string };
            res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
        } catch (error) {
            res.status(401).json({ success: false, message: 'Token inválido o expirado' });
        }
    }
}
// Middleware para proteger rutas
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).json({ success: false, message: 'Acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
        if (decoded.role !== 'admin') {
            res.status(403).json({ success: false, message: 'No tienes permisos' });
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
}


