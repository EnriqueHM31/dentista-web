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
exports.ModeloEspecialista = void 0;
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("../../database/db"));
class ModeloEspecialista {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('SELECT id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio FROM Especialistas');
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos + error: ' + error };
            }
        });
    }
    static createEspecialista(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio }) {
            try {
                const id = (0, crypto_1.randomUUID)();
                const [result] = yield db_1.default.query(`INSERT INTO Especialistas (id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, // puedes agregar más en el futuro
                [id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio]);
                if (result.affectedRows === 1) {
                    return {
                        success: true,
                        message: 'Especialista creado correctamente',
                        especialista: {
                            id: result.insertId,
                            nombre: nombre,
                            apellido: apellido,
                            email: email,
                            telefono: telefono,
                            direccion: direccion,
                            avatar: avatar,
                            linkedin: linkedin,
                            servicio: servicio
                        }
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'No se insertó el especialista'
                    };
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al crear el especialista: ' + error.message
                };
            }
        });
    }
    static updateEspecialista(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowedFields = ['nombre', 'apellido', 'email', 'telefono', 'direccion', 'avatar', 'linkedin', 'servicio']; // puedes agregar más en el futuro
                const fields = [];
                const values = [];
                for (const key of Object.keys(data)) {
                    if (allowedFields.includes(key) && data[key] !== undefined) {
                        fields.push(`${key} = ?`);
                        values.push(data[key]);
                    }
                }
                if (fields.length === 0) {
                    return { success: false, message: 'No se proporcionaron campos válidos para actualizar' };
                }
                values.push(id); // ID al final para el WHERE
                const query = `UPDATE Especialistas SET ${fields.join(', ')} WHERE id = ?`;
                const [result] = yield db_1.default.query(query, values);
                if (result) {
                    return { success: true, message: 'Especialista actualizado correctamente' };
                }
                else {
                    return { success: false, message: 'No se encontró el especialista o no se realizaron cambios' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al actualizar el especialista' + error };
            }
        });
    }
    static deleteEspecialista(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.query(`DELETE FROM Especialistas WHERE id = ?`, [id]);
                if (result) {
                    return { success: true, message: 'Especialista eliminado correctamente' };
                }
                else {
                    return { success: false, message: 'No se encontró el especialista o no se realizaron cambios' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al eliminar el especialista' + error };
            }
        });
    }
}
exports.ModeloEspecialista = ModeloEspecialista;
