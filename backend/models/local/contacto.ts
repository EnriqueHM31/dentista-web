import { transporter } from '../../utils/contacto';

export class ModeloContacto {
    static async EnviarMensaje(nombre: string, email: string, interes: string, mensaje: string) {
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
            <strong>Interés:</strong> ${interes}
            </p>
            
            <div style="background-color: rgb(0, 12, 37); padding: 16px; border-left: 4px solid #ffffff88; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; margin: 0;"><strong>Mensaje:</strong></p>
            <p style="margin-top: 8px;">${mensaje}</p>
            </div>
        </div>
        `
        };

        try {
            await transporter.sendMail(mailOptions);
            return { success: true, message: 'Mensaje enviado correctamente' };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: 'Error enviando el mensaje' };
        }



    }
}