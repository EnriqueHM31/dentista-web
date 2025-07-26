import { transporter } from '@/utils/contacto';
import db from '@/database/db';
import { REMITENTE, DESTINATARIO } from '@/config';

interface Comentario {
    nombre: string;
    ranking: number;
    email: string;
    servicio: string;
    mensaje: string;
    comentario: string;
}

export class ModeloContacto {

    static async getComentarios() {
        try {
            const [rows] = await db.query('SELECT * FROM Comentarios');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async getComentariosVisibles() {
        try {
            const [rows] = await db.query('SELECT * FROM Comentarios WHERE visible = 1');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async EnviarMensaje({ nombre, ranking, email, servicio, mensaje }: Comentario) {

        const mailOptions = {
            from: REMITENTE,
            to: DESTINATARIO,
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
            <strong>Comentario sobre:</strong> ${servicio}
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
            const info = await transporter.sendMail(mailOptions);

            if (info.accepted.length > 0) {

                const [result] = await db.query('INSERT INTO Comentarios (nombre, ranking, email, servicio, mensaje) VALUES (?, ?, ?, ?, ?)', [nombre, ranking, email, servicio, mensaje]);

                if (result) {
                    return { success: true, message: 'Comentario enviado correctamente' }
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
    }

    static async updateComentario(id: string, visible: boolean) {
        try {
            const [rows] = await db.query('UPDATE Comentarios SET visible = ? WHERE id = ?', [visible, id]);
            if (!rows) {
                return { success: false, message: 'No se encontró la pregunta a modificar' };
            }

            const [resultVisible] = await db.execute(
                'SELECT id, visible FROM Comentarios WHERE id = ?',
                [id]
            );

            return { success: true, message: "Comentario actualizado correctamente", comentario: resultVisible };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }


    static async deleteComentario(id: string) {
        try {
            const [rows] = await db.query('DELETE FROM Comentarios WHERE id = ?', [id]);
            if (!rows) {
                return { success: false, message: 'No se encontró la pregunta a eliminar' };
            }
            return { success: true, message: "Se elimino el comentario" };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }
}