"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.TIPO_SERVICIO_MESSAGE = exports.NOMBRE_COOKIE = exports.NODE_ENV = exports.USUARIO_ID = exports.API_URL = exports.SECRET = exports.PASS_GMAIL = exports.DESTINATARIO = exports.REMITENTE = exports.PORT = void 0;
exports.PORT = process.env.PORT || 3000;
exports.REMITENTE = process.env.REMITENTE;
exports.DESTINATARIO = process.env.DESTINATARIO;
exports.PASS_GMAIL = process.env.PASS_GMAIL;
exports.SECRET = process.env.SECRET;
exports.API_URL = process.env.API_URL;
exports.USUARIO_ID = process.env.USUARIO_ID;
exports.NODE_ENV = process.env.NODE_ENV;
exports.NOMBRE_COOKIE = 'token';
exports.TIPO_SERVICIO_MESSAGE = "gmail";
// DATABASE
exports.DB_HOST = 'localhost';
exports.DB_USER = 'root';
exports.DB_PASSWORD = '1234';
exports.DB_NAME = 'odontologia';
