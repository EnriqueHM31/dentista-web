import { DESTINATARIO, REMITENTE } from "@/config";
import { ComentarioEnviarMensajeProps } from "@/types/comentario";

export const MensajeCorreo = ({ nombre, ranking, email, servicio, mensaje }: ComentarioEnviarMensajeProps) => {
    return {
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

}