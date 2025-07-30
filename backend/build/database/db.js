"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../config");
exports.db = promise_1.default.createPool({
    host: config_1.DB_HOST, // Host de la base de datos
    user: config_1.DB_USER, // Nombre de usuario
    password: config_1.DB_PASSWORD, // Contraseña
    database: config_1.DB_NAME, // Nombre de la base de datos
});
