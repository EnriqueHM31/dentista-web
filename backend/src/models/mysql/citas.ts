import { db } from '@/database/db';
import { CitaCrearProps, CitaEditarProps, CitaResponseProps } from '@/types/citas';
import { UUID } from '@/types/types';
import { generarIdUnico } from '@/utils/generador';


export class ModeloCita {
    static async getAll() {
        try {
            const [rows] = await db.query<CitaResponseProps[]>(`SELECT C.id,C.nombre, C.email, C.telefono, S.titulo AS servicio, C.comentarios, C.fecha, C.hora, C.completada FROM Citas C JOIN ServiciosDentales S ON C.servicio = S.id ORDER BY C.fecha ASC`);

            return { success: true, message: "Citas obtenidas correctamente", citas: rows };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos + error: ' + error, citas: [] };
        }
    }

    static async createCita({ nombre, email, telefono, servicio, comentarios, fecha, hora }: CitaCrearProps) {
        try {
            const id = generarIdUnico();

            const [ResultInsertCita] = await db.query(
                `INSERT INTO Citas (id, nombre, email, telefono, comentarios, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, nombre, email, telefono, comentarios, servicio, fecha, hora]
            );

            if (!ResultInsertCita) return { success: false, message: 'No se insertó la cita', cita: {} };


            const [ResultCitaCreada] = await db.query<CitaResponseProps[]>(`SELECT * FROM Citas WHERE id = ?`, [id]);

            if (!ResultCitaCreada) return { success: false, message: 'No se insertó la cita', cita: {} };

            const CitaCreada = ResultCitaCreada[0];

            return { success: true, message: 'Cita creada correctamente', cita: CitaCreada };
        } catch (error) {
            return { success: false, message: 'Error al crear la cita', cita: {} };
        }
    }

    static async deleteCita(id: UUID) {
        try {
            const [resultCitaEliminada] = await db.query(`DELETE FROM Citas WHERE id = ?`, [id]);
            if (resultCitaEliminada) {
                return { success: true, message: 'Cita eliminada correctamente', cita: { id } };
            } else {
                return { success: false, message: 'No se encontró la cita o no se realizaron cambios', cita: {} };
            }
        } catch (error) {
            return { success: false, message: 'Error al eliminar la cita', cita: {} };
        }
    }


    static async updateCita({ id, completado }: CitaEditarProps) {
        try {

            const [resultCitaModificada] = await db.query(`UPDATE Citas SET completada = ? WHERE id = ?`, [completado, id]);

            if (resultCitaModificada) {
                return { success: true, message: 'Cita actualizada correctamente', cita: { id, completado } };
            } else {
                return { success: false, message: 'No se encontró la cita o no se realizaron cambios', cambios: {} };
            }
        }
        catch (error) {
            return { success: false, message: 'Error al actualizar la cita', cita: {} };
        }

    }
}
