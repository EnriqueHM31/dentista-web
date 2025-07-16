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
exports.ContrallerUsuario = void 0;
const usuario_1 = require("../models/mysql/usuario");
class ContrallerUsuario {
    static getUsuario(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message } = yield usuario_1.ModeloUsuario.getUsuario();
                if (success) {
                    res.status(200).json({ success, message });
                }
                else {
                    res.status(500).json({ success, message });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error en la base de datos' });
            }
        });
    }
    static updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const { success, message } = yield usuario_1.ModeloUsuario.updateUsuario(username, password);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ContrallerUsuario = ContrallerUsuario;
