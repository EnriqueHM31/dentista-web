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
exports.ServiciosController = void 0;
const servicio_1 = require("../models/mysql/servicio");
class ServiciosController {
    static crearServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, descripcion, img, duration } = req.body;
            const { success, message, servicio } = yield servicio_1.ModeloServicio.crearServicio({ titulo, descripcion, img, duration });
            if (success) {
                res.status(200).json({ success, message, servicio });
            }
            else {
                res.status(500).json({ success, message, servicio: {} });
            }
        });
    }
    static getServicios(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message } = yield servicio_1.ModeloServicio.getServicios();
                if (success) {
                    res.status(200).json({ success, message });
                }
                else {
                    res.status(500).json({ success, message });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener los servicios' });
            }
        });
    }
    static updateServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const id = req.params.id;
            const { success, message } = yield servicio_1.ModeloServicio.updateServicio(id, data);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static deleteServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { success, message } = yield servicio_1.ModeloServicio.deleteServicio(id);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ServiciosController = ServiciosController;
