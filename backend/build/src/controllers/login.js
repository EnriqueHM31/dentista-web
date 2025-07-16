"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerLogin = exports.JWT_SECRET = void 0;
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_1 = require("../models/mysql/login");
exports.JWT_SECRET = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : (() => {
    throw new Error("SECRET no está definido en .env");
})();
class ControllerLogin {
    static InicioSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(200).json({ success: false, message: 'Credenciales incompletas.' });
            }
            if (typeof username !== 'string' || typeof password !== 'string') {
                res.status(200).json({ success: false, message: 'Credenciales incorrectas.' });
            }
            try {
                const { success, message, token } = yield login_1.ModeloLogin.InicioSesion(username, password);
                if (!success) {
                    res.status(200).json({ success: false, message: message });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 60 * 60 * 1000,
                });
                res.status(200).json({ success: true, message: 'Sesión iniciada correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al iniciar sesión: ' + error });
            }
        });
    }
    static VerificarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            if (!token) {
                res.status(401).json({ success: false, message: 'No autorizado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
                res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
            }
            catch (error) {
                res.status(401).json({ success: false, message: 'Token inválido o expirado' });
            }
        });
    }
    static Autenticacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            if (!token) {
                res.status(200).json({ success: false, message: 'No autorizado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
                res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
            }
            catch (error) {
                res.status(401).json({ success: false, message: 'Token inválido o expirado' });
            }
        });
    }
    static Logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('token');
                res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
            }
        });
    }
}
exports.ControllerLogin = ControllerLogin;
// Middleware para proteger rutas
function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({ success: false, message: 'Acceso denegado' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
        if (decoded.role !== 'admin') {
            res.status(403).json({ success: false, message: 'No tienes permisos' });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
}
