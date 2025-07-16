import { randomUUID } from 'crypto';
import db from '@/database/db';

export class ModeloEspecialista {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio FROM Especialistas');
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createEspecialista({ nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio }: Record<string, string>) {
        try {
            const id = randomUUID();

            const [result]: any = await db.query(
                `INSERT INTO Especialistas (id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,   // puedes agregar más en el futuro
                [id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio]
            );

            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: 'Especialista creado correctamente',
                    especialista: {
                        id: result.insertId,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        telefono: telefono,
                        direccion: direccion,
                        avatar: avatar,
                        linkedin: linkedin,
                        servicio: servicio
                    }
                };
            } else {
                return {
                    success: false,
                    message: 'No se insertó el especialista'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear el especialista: ' + (error as Error).message
            };
        }
    }



    static async updateEspecialista(id: string, data: Record<string, string>) {
        try {

            const allowedFields = ['nombre', 'apellido', 'email', 'telefono', 'direccion', 'avatar', 'linkedin', 'servicio']; // puedes agregar más en el futuro

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

            const query = `UPDATE Especialistas SET ${fields.join(', ')} WHERE id = ?`;

            const [result] = await db.query(query, values);

            if (result) {
                return { success: true, message: 'Especialista actualizado correctamente' };
            } else {
                return { success: false, message: 'No se encontró el especialista o no se realizaron cambios' };
            }
        } catch (error) {
            return { success: false, message: 'Error al actualizar el especialista' + error };
        }
    }


    static async deleteEspecialista(id: string) {
        try {
            const [result] = await db.query(`DELETE FROM Especialistas WHERE id = ?`, [id]);
            if (result) {
                return { success: true, message: 'Especialista eliminado correctamente' };
            } else {
                return { success: false, message: 'No se encontró el especialista o no se realizaron cambios' };
            }
        } catch (error) {
            return { success: false, message: 'Error al eliminar el especialista' + error };
        }
    }


}