import { randomUUID } from 'crypto';
import db from '@/database/db';
import { RowDataPacket } from 'mysql2';

interface Especialista {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    avatar: string;
    linkedin: string;
    servicio: string;
}

interface TituloServicioObtenido extends RowDataPacket {
    titulo: string;
}

export class ModeloEspecialista {
    static async getAll() {
        try {
            const [rows] = await db.query(`SELECT 
    e.id,
    e.nombre,
    e.apellido,
    e.email,
    e.telefono,
    e.direccion,
    e.avatar,
    e.linkedin,
    e.servicio,
    s.titulo AS servicio
FROM Especialistas e
JOIN ServiciosDentales s ON e.servicio = s.id
ORDER BY e.nombre, e.apellido ASC;
`);
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

                const [rows] = await db.query<TituloServicioObtenido[]>(`SELECT titulo FROM ServiciosDentales WHERE id = ?`, [servicio]);
                return {
                    success: true,
                    message: 'Especialista creado correctamente',
                    especialista: {
                        id: id,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        telefono: telefono,
                        direccion: direccion,
                        avatar: avatar,
                        linkedin: linkedin,
                        servicio: rows[0].titulo
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



    static async updateEspecialista(id: string, data: Partial<Especialista>) {
        try {

            const allowedFields: (keyof Omit<Especialista, 'id'>)[] = [
                'nombre', 'apellido', 'email', 'telefono', 'direccion', 'avatar', 'linkedin', 'servicio',
            ];

            const fields: string[] = [];
            const values: Especialista[keyof Especialista][] = [];

            for (const key of Object.keys(data) as (keyof Especialista)[]) {
                if (allowedFields.includes(key as keyof Omit<Especialista, 'id'>) && data[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(data[key] as Especialista[keyof Especialista]);
                }
            }

            if (fields.length === 0) {
                return { success: false, message: 'No se proporcionaron campos válidos para actualizar' + JSON.stringify(data) };
            }

            values.push(id); // ID al final para el WHERE

            const query = `UPDATE Especialistas SET ${fields.join(', ')} WHERE id = ?`;

            const [result] = await db.query(query, values);

            if (result) {
                return { success: true, message: 'Especialista actualizado correctamente', cambios: data };
            } else {
                return { success: false, message: 'No se encontró el especialista o no se realizaron cambios', cambios: {} };
            }
        } catch (error) {
            return { success: false, message: 'Error al actualizar el especialista' + error, cambios: {} };
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