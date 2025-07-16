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
exports.ModeloPreguntas = void 0;
const db_1 = __importDefault(require("../../database/db"));
class ModeloPreguntas {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('SELECT id, pregunta, respuesta FROM Preguntas');
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos + error: ' + error };
            }
        });
    }
    static createPregunta(pregunta, respuesta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('INSERT INTO Preguntas (pregunta, respuesta) VALUES (?, ?)', [pregunta, respuesta]);
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
    static updatePregunta(id, pregunta, respuesta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('UPDATE Preguntas SET pregunta = ?, respuesta = ? WHERE id = ?', [pregunta, respuesta, id]);
                if (!rows) {
                    return { success: false, message: 'No se encontró la pregunta a modificar' };
                }
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
    static deletePregunta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('DELETE FROM Preguntas WHERE id = ?', [id]);
                if (!rows) {
                    return { success: false, message: 'No se encontró la pregunta a eliminar' };
                }
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
}
exports.ModeloPreguntas = ModeloPreguntas;
