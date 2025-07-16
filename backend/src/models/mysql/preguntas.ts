import db from '@/database/db';

interface Pregunta {
    pregunta: string;
    respuesta: string;
}


export class ModeloPreguntas {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT id, pregunta, respuesta FROM Preguntas ORDER BY pregunta ASC');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createPregunta({ pregunta, respuesta }: Pregunta) {
        try {
            const id = crypto.randomUUID();
            const [result] = await db.query('INSERT INTO Preguntas (id, pregunta, respuesta) VALUES (?, ?, ?)', [id, pregunta, respuesta]);

            if (!result) {
                return { success: false, message: "Error al crear la pregunta" };
            }

            return { success: true, message: "Pregunta creada correctamente", pregunta: { id, pregunta, respuesta } };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }


    static async updatePregunta(id: string, { pregunta, respuesta }: Partial<Pregunta>) {
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