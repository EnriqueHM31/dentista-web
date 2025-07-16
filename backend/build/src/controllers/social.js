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
exports.ContrallerSocial = void 0;
const social_1 = require("../models/mysql/social");
class ContrallerSocial {
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message } = yield social_1.ModeloSocial.getAll();
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
    static updateSocial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { referencia } = req.body;
            const { id } = req.params;
            if (!id || !referencia) {
                res.status(400).json({ success: false, message: 'Faltan datos' });
            }
            const { success, message } = yield social_1.ModeloSocial.updateSocial(id, referencia);
            if (success) {
                res.status(200).json({ success, message });
            }
            else {
                res.status(500).json({ success, message });
            }
        });
    }
}
exports.ContrallerSocial = ContrallerSocial;
