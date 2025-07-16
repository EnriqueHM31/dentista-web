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
exports.ModeloServicio = void 0;
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("../../database/db"));
class ModeloServicio {
    static crearServicio(_a) {
        return __awaiter(this, arguments, void 0, function* ({ titulo, descripcion, img, duration }) {
            try {
                const id = (0, crypto_1.randomUUID)();
                const [result] = yield db_1.default.query(`INSERT INTO ServiciosDentales (id, name, description, img, duration) VALUES (?, ?, ?, ?, 30)`, [id, titulo, descripcion, img, duration]);
                if (result.affectedRows === 1) {
                    return {
                        success: true,
                        message: 'Servicio creado correctamente',
                        servicio: {
                            id,
                            name: titulo,
                            description: descripcion,
                            img,
                            duration
                        }
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'No se insertó el servicio'
                    };
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al crear el servicio: ' + error.message
                };
            }
        });
    }
    static getServicios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query(`SELECT id, name, description, img, duration FROM ServiciosDentales ORDER BY name ASC`);
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
    static updateServicio(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowedFields = ['name', 'description', 'img', 'duration']; // puedes agregar más en el futuro
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
                const query = `UPDATE ServiciosDentales SET ${fields.join(', ')} WHERE id = ?`;
                const [result] = yield db_1.default.query(query, values);
                if (result) {
                    return { success: true, message: 'Servicio actualizado correctamente' };
                }
                else {
                    return { success: false, message: 'No se encontró el servicio o no se realizaron cambios' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al actualizar el servicio' + error };
            }
        });
    }
    static deleteServicio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.query(`DELETE FROM ServiciosDentales WHERE id = ?`, [id]);
                if (result) {
                    return { success: true, message: 'Servicio eliminado correctamente' };
                }
                else {
                    return { success: false, message: 'No se encontró el servicio o no se realizaron cambios' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al eliminar el servicio' + error };
            }
        });
    }
}
exports.ModeloServicio = ModeloServicio;
