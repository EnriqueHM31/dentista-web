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
exports.ContrallerContacto = void 0;
const comentario_1 = require("../models/local/comentario");
class ContrallerContacto {
    static EnviarMensaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, ranking, email, categoria, comentario } = req.body;
            if (!username || !email || !comentario || !categoria || !ranking) {
                res.status(400).json({ error: `Faltan datos ${username} ${ranking} ${email} ${categoria} ${comentario}` });
            }
            const { success, message } = yield comentario_1.ModeloContacto.EnviarMensaje(username, ranking, email, categoria, comentario);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static getComentarios(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, message } = yield comentario_1.ModeloContacto.getComentarios();
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static getComentariosVisibles(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, message } = yield comentario_1.ModeloContacto.getComentariosVisibles();
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static updateComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { visible } = req.body;
            const id = req.params.id;
            const { success, message } = yield comentario_1.ModeloContacto.updateComentario(id, visible);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
    static deleteComentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { success, message } = yield comentario_1.ModeloContacto.deleteComentario(id); // id del comentario
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ContrallerContacto = ContrallerContacto;
