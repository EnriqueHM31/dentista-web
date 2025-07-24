import { randomUUID } from 'crypto';
import db from '@/database/db';
import { RowDataPacket } from 'mysql2';

interface Cita extends RowDataPacket {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    telefono: string;
    servicio: string;
    comentarios: string;
    fecha: string;
    hora: string;
}

interface CitaCrear extends Omit<Cita, 'id'> {
    id: string; // o id?: string; si quieres que sea opcional
}


export class ModeloCita {
    static async getAll() {
        try {
            const [rows] = await db.query<Cita[]>(`SELECT id, nombre, email, telefono, servicio, comentarios, fecha, hora FROM Citas ORDER BY fecha ASC`);
            return { success: true, message: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error };
        }
    }

    static async createCita({ nombre, email, mensaje, telefono, servicio, comentarios, fecha, hora }: CitaCrear) {
        try {
            const id = randomUUID();

            const [result]: any = await db.query(
                `INSERT INTO Citas (id, nombre, email, telefono, comentarios, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,   // puedes agregar más en el futuro
                [id, nombre, email, mensaje, telefono, servicio, comentarios, fecha, hora]
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
                        telefono: telefono,
                        servicio: servicio,
                        comentarios: comentarios,
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