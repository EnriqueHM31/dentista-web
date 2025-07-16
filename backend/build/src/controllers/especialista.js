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
exports.ControllerEspecialistas = void 0;
const especialista_1 = require("../models/mysql/especialista");
class ControllerEspecialistas {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message } = yield especialista_1.ModeloEspecialista.getAll();
                if (success) {
                    res.status(200).json({ success, message });
                }
                else {
                    res.status(500).json({ success, message });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Ocurrio un error interno del servidor' });
            }
        });
    }
    static createEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, email, telefono, direccion, foto, nivel, especialidad, usuario } = req.body;
            const { success, message, especialista } = yield especialista_1.ModeloEspecialista.createEspecialista({ nombre, apellido, email, telefono, direccion, foto, nivel, especialidad, usuario });
            if (success) {
                res.status(200).json({ success, message, especialista });
            }
            else {
                res.status(500).json({ success, message, especialista: {} });
            }
        });
    }
    static updateEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, email, telefono, direccion, foto, nivel, especialidad, usuario } = req.body;
            const { id } = req.params;
            const { success, message } = yield especialista_1.ModeloEspecialista.updateEspecialista(id, { nombre, apellido, email, telefono, direccion, foto, nivel, especialidad, usuario });
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static deleteEspecialista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { success, message } = yield especialista_1.ModeloEspecialista.deleteEspecialista(id);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ControllerEspecialistas = ControllerEspecialistas;
