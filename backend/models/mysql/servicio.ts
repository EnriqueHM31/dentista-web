import db from '../../database/db';

export class ModeloServicio {

    static async getServicios() {
        try {
            const [rows] = await db.query(`SELECT id, name, description, img FROM ServiciosDentales`);
            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async updateServicio(id: string, data: Record<string, string>) {
        try {

            console.log(data);
            // Lista blanca de campos que sí se pueden actualizar
            const allowedFields = ['name', 'description', 'img']; // puedes agregar más en el futuro

            const fields: string[] = [];
            const values: string[] = [];

            for (const key of Object.keys(data)) {
                if (allowedFields.includes(key) && data[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(data[key]);
                }
            }

            if (fields.length === 0) {
                return { success: false, message: 'No se proporcionaron campos válidos para actualizar' };
            }

            values.push(id); // ID al final para el WHERE

            const query = `UPDATE ServiciosDentales SET ${fields.join(', ')} WHERE id = ?`;

            const [result] = await db.query(query, values);

            if (result) {
                return { success: true, message: 'Servicio actualizado correctamente' };
            } else {
                return { success: false, message: 'No se encontró el servicio o no se realizaron cambios' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error al actualizar el servicio' + error };
        }
    }


}