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

}