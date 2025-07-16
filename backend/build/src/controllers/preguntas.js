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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerPreguntas = void 0;
const preguntas_1 = require("../models/mysql/preguntas");
class ControllerPreguntas {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message } = yield preguntas_1.ModeloPreguntas.getAll();
                if (success) {
                    res.status(200).json({ success, message });
                }
                else {
                    res.status(500).json({ message });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
            }
        });
    }
    static createPregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pregunta, respuesta } = req.body;
            if (!pregunta || !respuesta) {
                res.status(400).json({ success: false, message: 'Faltan datos' });
            }
            const { success, message } = yield preguntas_1.ModeloPreguntas.createPregunta(pregunta, respuesta);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static updatePregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pregunta, respuesta } = req.body;
            const { id } = req.params;
            if (!id || !pregunta || !respuesta) {
                res.status(400).json({ success: false, message: 'Faltan datos' });
            }
            const { success, message } = yield preguntas_1.ModeloPreguntas.updatePregunta(id, pregunta, respuesta);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static deletePregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ success: false, message: 'Faltan datos' });
            }
            const { success, message } = yield preguntas_1.ModeloPreguntas.deletePregunta(id);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ControllerPreguntas = ControllerPreguntas;
