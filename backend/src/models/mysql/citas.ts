import { randomUUID } from 'crypto';
import db from '@/database/db';
import { RowDataPacket } from 'mysql2';

interface Cita extends RowDataPacket {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    avatar: string;
    servicio: string;
    comentario: string;
    fecha: string;
    hora: string;
}


export class ModeloCita {
    static async getAll() {
        try {
            const [rows] = await db.query<Cita[]>(`SELECT * FROM Citas ORDER BY id ASC`);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createCita({ nombre, email, mensaje, avatar, servicio, comentario, fecha, hora }: Record<string, string>) {
        try {
            const id = randomUUID();

            const [result]: any = await db.query(
                `INSERT INTO Citas (id, nombre, email, mensaje, avatar, servicio, comentario, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,   // puedes agregar más en el futuro
                [id, nombre, email, mensaje, avatar, servicio, comentario, fecha, hora]
            );

            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: 'Cita creada correctamente',
                    cita: {
                        id: id,
                        nombre: nombre,
                        email: email,
                        mensaje: mensaje,
                        avatar: avatar,
                        servicio: servicio,
                        comentario: comentario,
                        fecha: fecha,
                        hora: hora
                    }
                };
            } else {
                return {
                    success: false,
                    message: 'No se insertó la cita'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear la cita: ' + (error as Error).message
            };
        }
    }

    static async deleteCita(id: string) {
        try {
            const [result] = await db.query(`DELETE FROM Citas WHERE id = ?`, [id]);
            if (result) {
                return { success: true, message: 'Cita eliminada correctamente' };
            } else {
                return { success: false, message: 'No se encontró la cita o no se realizaron cambios' };
            }
        } catch (error) {
            return { success: false, message: 'Error al eliminar la cita' + error };
        }
    }


}           