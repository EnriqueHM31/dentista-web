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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeloUsuario = void 0;
const db_1 = __importDefault(require("../../database/db"));
class ModeloUsuario {
    static getUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ID_USER = process.env.USUARIO_ID;
                const [rows] = yield db_1.default.query(`SELECT username, password FROM Usuario WHERE id = ?`, [ID_USER]);
                return {
                    success: true,
                    message: rows,
                };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
    static updateUsuario(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ID_USER = process.env.USUARIO_ID;
                const campos = [];
                const valores = [];
                if (username) {
                    campos.push('username = ?');
                    valores.push(username);
                }
                if (password) {
                    campos.push('password = ?');
                    valores.push(password);
                }
                if (campos.length === 0) {
                    return { success: false, message: 'No se proporcionaron campos para actualizar' };
                }
                valores.push(ID_USER); // ID al final
                const query = `UPDATE Usuario SET ${campos.join(', ')} WHERE id = ?`;
                const [rows] = yield db_1.default.query(query, valores);
                return {
                    success: true,
                    message: rows,
                };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
}
exports.ModeloUsuario = ModeloUsuario;
