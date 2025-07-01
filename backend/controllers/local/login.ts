import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.SECRET ?? (() => {
    throw new Error("SECRET no está definido en .env");
})();

export class ControllerLogin {
    static async InicioSesion(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ success: false, message: 'Credenciales incompletas.' });
        }

        if (username !== 'admin') {
            res.status(400).json({ success: false, message: 'El usuario no existe.' });
        }

        if (password !== '1234') {
            res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true en producción con HTTPS
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // 1 hora
        });

        res.json({ success: true });
    }

    static async VerificarSesion(req: Request, res: Response) {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ success: false, message: 'No autorizado' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
            res.json({ success: true, role: decoded.role });
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
