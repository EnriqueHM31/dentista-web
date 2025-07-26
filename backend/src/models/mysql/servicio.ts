import { randomUUID } from 'crypto';
import db from '@/database/db';

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
                `INSERT INTO ServiciosDentales (id, titulo, descripcion, img, duration) VALUES (?, ?, ?, ?, 30)`,
                [id, titulo, descripcion, img, duration]
            );

            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: 'Servicio creado correctamente',
                    servicio: {
                        id,
                        titulo,
                        descripcion,
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
                message: 'Error al crear el servicio'
            };
        }
    }

    static async getServicios() {
        try {
            const [rows] = await db.query(`SELECT id, titulo, descripcion, img, duration FROM ServiciosDentales ORDER BY titulo ASC`);
            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' };
        }
    }

    static async getDisponibles() {
        try {
            const [rows] = await db.query(`SELECT 
    s.id,
    s.titulo,
    s.descripcion,
    s.img,
    s.duration
FROM ServiciosDentales s
LEFT JOIN Especialistas e ON s.id = e.servicio
WHERE e.servicio IS NULL;
`);
            return {
                success: true,
                message: rows,
            };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos' + error };
        }
    }


    static async updateServicio(id: string, data: Partial<Servicio>) {
        const allowedFields = ['titulo', 'descripcion', 'img', 'duration']; // Campos permitidos
        const fields: string[] = [];
        const values: string[] = [];

        for (const key of Object.keys(data) as (keyof Servicio)[]) {
            if (allowedFields.includes(key) && data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key] as string);
            }
        }

        if (fields.length === 0) {
            return {
                success: false,
                message: 'No se proporcionaron campos válidos para actualizar',
                cambios: {},
            };
        }

        values.push(id); // Agrega el ID al final para el WHERE

        const query = `UPDATE ServiciosDentales SET ${fields.join(', ')} WHERE id = ?`;

        try {
            const [result]: any = await db.query(query, values);

            if (result.affectedRows > 0) {
                // Extrae el nombre del campo (sin " = ?") y lo asocia al valor correspondiente
                const cambios = Object.fromEntries(
                    fields.map((f, i) => [f.split(' = ')[0], values[i]])
                );

                return {
                    success: true,
                    message: 'Servicio actualizado correctamente',
                    cambios,
                };
            } else {
                return {
                    success: false,
                    message: 'No se encontró el servicio o no se realizaron cambios',
                    cambios: {},
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar el servicio',
                error,
            };
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