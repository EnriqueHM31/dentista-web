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
exports.ModeloSocial = void 0;
const sociales_json_1 = __importDefault(require("../../mooks/sociales.json"));
class ModeloSocial {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return { success: true, message: sociales_json_1.default };
            }
            catch (error) {
                return { success: false, message: 'Error obteniendo datos' };
            }
        });
    }
    static createSocial(nombre, referencia, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const social = sociales_json_1.default.find((social) => social.id === id);
                if (social) {
                    return { success: false, message: 'Ya existe' };
                }
                else {
                    sociales_json_1.default.push({ nombre, referencia, id });
                    return { success: true, message: 'Creado correctamente' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al crear la red social' };
            }
        });
    }
    static deleteSocial(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Eliminado = sociales_json_1.default.find((social) => social.id === id);
                if (Eliminado) {
                    sociales_json_1.default.filter((social) => social.id !== id);
                    return { success: true, message: `Eliminado correctamente ${Eliminado.id}` };
                }
                else {
                    return { success: false, message: 'No existe' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error al eliminar la red social' };
            }
        });
    }
    static updateSocial(id, nombre, referencia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = sociales_json_1.default.findIndex(item => item.id === id);
                if (index === -1) {
                    return { success: false, message: "No se encontró la red social a modificar" };
                }
                const newItemSocial = {
                    id,
                    nombre,
                    referencia
                };
                sociales_json_1.default[index] = newItemSocial;
                return { success: true, message: "Red social actualizada correctamente", data: newItemSocial };
            }
            catch (error) {
                return { success: false, message: "Ocurrió un error con el servidor" };
            }
        });
    }
}
exports.ModeloSocial = ModeloSocial;
