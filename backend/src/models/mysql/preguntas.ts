import db from '@/database/db';

export class ModeloPreguntas {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT id, pregunta, respuesta FROM Preguntas');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createPregunta(pregunta: string, respuesta: string) {
        try {
            const [rows] = await db.query('INSERT INTO Preguntas (pregunta, respuesta) VALUES (?, ?)', [pregunta, respuesta]);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }


    static async updatePregunta(id: string, pregunta: string, respuesta: string) {
        try {

            const [rows] = await db.query('UPDATE Preguntas SET pregunta = ?, respuesta = ? WHERE id = ?', [pregunta, respuesta, id]);

            if (!rows) {
                return { success: false, message: 'No se encontró la pregunta a modificar' };
            }

            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }


    static async deletePregunta(id: string) {
        try {
            const [rows] = await db.query('DELETE FROM Preguntas WHERE id = ?', [id]);

            if (!rows) {
                return { success: false, message: 'No se encontró la pregunta a eliminar' };
            }

            return { success: true, message: "Pregunta eliminada correctamente" };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }
}