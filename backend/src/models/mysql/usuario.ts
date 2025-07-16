import db from '@/database/db';
import { validarId } from '@/utils/Validacion';
interface Usuario {
    username: string;
    password: string;
}
const ID_USER = process.env.USUARIO_ID;

export class ModeloUsuario {

    static async getUsuario() {
        try {
            const resultID = validarId({ id: ID_USER as `${string}-${string}-${string}-${string}-${string}` });
            if (resultID.error) {
                return { success: false, message: 'ID de usuario no válido' };
            }

            const [rows] = await db.query(`SELECT username, password FROM Usuario WHERE id = ?`, [ID_USER]);
            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async updateUsuario({ username, password }: Partial<Usuario>) {
        try {
            const resultID = validarId({ id: ID_USER as `${string}-${string}-${string}-${string}-${string}` });
            if (resultID.error) {
                return { success: false, message: 'ID de usuario no válido' };
            }

            const campos = [];
            const valores = [];

            if (username) {
                campos.push('username = ?');
                valores.push(username);
            }

            if (password) {
                campos.push('password = ?');
                valores.push(password);
            }

            if (campos.length === 0) {
                return { success: false, message: 'No se proporcionaron campos para actualizar' };
            }

            valores.push(ID_USER); // ID al final

            const query = `UPDATE Usuario SET ${campos.join(', ')} WHERE id = ?`;
            const [rows] = await db.query(query, valores);

            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }
}
