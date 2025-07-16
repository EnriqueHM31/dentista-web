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
exports.ModeloContacto = void 0;
const contacto_1 = require("../../../utils/contacto");
const db_1 = __importDefault(require("../../database/db"));
class ModeloContacto {
    static getComentarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('SELECT * FROM Comentarios');
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos + error: ' + error };
            }
        });
    }
    static getComentariosVisibles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('SELECT * FROM Comentarios WHERE visible = 1');
                return { success: true, message: rows };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos + error: ' + error };
            }
        });
    }
    static EnviarMensaje(nombre, ranking, email, interes, mensaje) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.REMITENTE,
                to: process.env.DESTINATARIO,
                subject: 'Nuevo mensaje desde Odontología LEHM',
                text: mensaje,
                html: `
            <div style="background-color: rgb(2, 19, 49); color: #ffffff; font-family: Arial, sans-serif; padding: 24px; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="font-size: 24px; margin: 0; text-align: center;">Nuevo mensaje desde Odontología LEHM</h1>
            
            <p style="font-size: 16px; margin: 10px 0;">
            <strong>Nombre:</strong> ${nombre}
            </p>
            
            <p style="font-size: 16px; margin: 10px 0;">
            <strong>Correo electrónico:</strong> <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">${email}</a>
            </p>
            
            <p style="font-size: 16px; margin: 10px 0;">
            <strong>Comentario sobre:</strong> ${interes}
            </p>
            
            <p style="font-size: 16px; margin: 10px 0;">
            <strong>Puntuacion:</strong> ${ranking} estrellas
            </p>

            <div style="background-color: rgb(0, 12, 37); padding: 16px; border-left: 4px solid #ffffff88; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; margin: 0;"><strong>Mensaje:</strong></p>
            <p style="margin-top: 8px;">${mensaje}</p>
            </div>
        </div>
        `
            };
            try {
                const info = yield contacto_1.transporter.sendMail(mailOptions);
                if (info.accepted.length > 0) {
                    const [result] = yield db_1.default.query('INSERT INTO Comentarios (nombre, ranking, email, servicio, mensaje) VALUES (?, ?, ?, ?, ?)', [nombre, ranking, email, interes, mensaje]);
                    if (result) {
                        return { success: true, message: 'Comentario enviado correctamente' };
                    }
                    else {
                        return { success: false, message: 'Error al guardar el mensaje' };
                    }
                }
                else {
                    return { success: false, message: 'Error enviando el mensaje' };
                }
            }
            catch (error) {
                return { success: false, message: 'Error enviando el mensaje' + error };
            }
        });
    }
    static updateComentario(id, visible) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('UPDATE Comentarios SET visible = ? WHERE id = ?', [visible, id]);
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
    static deleteComentario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query('DELETE FROM Comentarios WHERE id = ?', [id]);
                if (!rows) {
                    return { success: false, message: 'No se encontró la pregunta a eliminar' };
                }
                return { success: true, message: "Se elimino el comentario" };
            }
            catch (error) {
                return { success: false, message: 'Error en la base de datos' };
            }
        });
    }
}
exports.ModeloContacto = ModeloContacto;
