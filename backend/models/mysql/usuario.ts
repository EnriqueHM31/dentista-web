import db from '../../database/db';

export class ModeloUsuario {
    static async updateUsuario(username: string, password: string) {
        try {
            const [rows] = await db.query('UPDATE Usuario SET username = ?, password = ? WHERE id = ?', [username, password]);

            if (!rows) {
                return { success: false, message: 'No se encontró la pregunta a modificar' };
            }

            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }
}