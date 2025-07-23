// Middleware para verificar JWT en cookie
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.SECRET || "secreto";

export const verificarTokenDesdeCookie = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // ← el token debe estar aquí

    if (!token) {
        res.status(401).json({ success: false, message: "Token no proporcionado" });
    }

    try {
        console.log(token);
        console.log(JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
        console.log(token);
        console.log(decoded);
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: "Token inválido o expirado" });
    }
};
