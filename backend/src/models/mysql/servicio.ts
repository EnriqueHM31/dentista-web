import { randomUUID } from 'crypto';
import db from '../../database/db';

interface Servicio {
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}



export class ModeloServicio {

    static async crearServicio({ titulo, descripcion, img, duration }: Servicio) {
        try {
            const id = randomUUID();

            const [result]: any = await db.query(
                `INSERT INTO ServiciosDentales (id, name, description, img, duration) VALUES (?, ?, ?, ?, 30)`,
                [id, titulo, descripcion, img, duration]
            );

            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: 'Servicio creado correctamente',
                    servicio: {
                        id,
                        name: titulo,
                        description: descripcion,
                        img,
                        duration

                    }
                };
            } else {
                return {
                    success: false,
                    message: 'No se insertó el servicio'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear el servicio: ' + (error as Error).message
            };
        }
    }

    static async getServicios() {
        try {
            const [rows] = await db.query(`SELECT id, name, description, img, duration FROM ServiciosDentales ORDER BY name ASC`);
            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async updateServicio(id: string, data: Partial<Servicio>) {
        try {

            const allowedFields = ['titulo', 'descripcion', 'img', 'duration']; // puedes agregar más en el futuro

            const fields: string[] = [];
            const values: string[] = [];

            for (const key of Object.keys(data) as (keyof Servicio)[]) {
                if (allowedFields.includes(key) && data[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(data[key] as string);
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
            return { success: false, message: 'Error al actualizar el servicio' };
        }
    }


    static async deleteServicio(id: string) {
        try {
            const [result] = await db.query(`DELETE FROM ServiciosDentales WHERE id = ?`, [id]);
            if (result) {
                return { success: true, message: 'Servicio eliminado correctamente' };
            } else {
                return { success: false, message: 'No se encontró el servicio o no se realizaron cambios' };
            }
        } catch (error) {
            return { success: false, message: 'Error al eliminar el servicio' };
        }
    }


}