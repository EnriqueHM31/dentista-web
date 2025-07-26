import { db } from '@/database/db';

export class ModeloSocial {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT id, nombre, referencia FROM Sociales');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createSocial(referencia: string) {
        try {
            const [rows] = await db.query('INSERT INTO Sociales (referencia) VALUES (?)', [referencia]);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async deleteSocial(id: string) {
        try {
            const [rows] = await db.query('DELETE FROM Sociales WHERE id = ?', [id]);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async updateSocial(id: string, referencia: string) {
        try {
            const [rows] = await db.query('UPDATE Sociales SET referencia = ? WHERE id = ?', [referencia, id]);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }
}