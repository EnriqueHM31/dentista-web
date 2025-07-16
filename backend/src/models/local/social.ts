import JSONSOCIALES from '@/mooks/sociales.json';

export class ModeloSocial {
    static async getAll() {
        try {
            return { success: true, message: JSONSOCIALES };
        } catch (error) {
            return { success: false, message: 'Error obteniendo datos' };
        }
    }

    static async createSocial(nombre: string, referencia: string, id: string) {
        try {
            const social = JSONSOCIALES.find((social) => social.id === id);

            if (social) {
                return { success: false, message: 'Ya existe' };
            } else {
                JSONSOCIALES.push({ nombre, referencia, id });
                return { success: true, message: 'Creado correctamente' };
            }
        } catch (error) {
            return { success: false, message: 'Error al crear la red social' };
        }
    }

    static async deleteSocial(id: string) {
        try {
            const Eliminado = JSONSOCIALES.find((social) => social.id === id);
            if (Eliminado) {
                JSONSOCIALES.filter((social) => social.id !== id);
                return { success: true, message: `Eliminado correctamente ${Eliminado.id}` };
            } else {
                return { success: false, message: 'No existe' };
            }
        } catch (error) {
            return { success: false, message: 'Error al eliminar la red social' };
        }
    }

    static async updateSocial(id: string, nombre: string, referencia: string) {
        try {
            const index = JSONSOCIALES.findIndex(item => item.id === id);

            if (index === -1) {
                return { success: false, message: "No se encontró la red social a modificar" };
            }

            const newItemSocial = {
                id,
                nombre,
                referencia
            };

            JSONSOCIALES[index] = newItemSocial;

            return { success: true, message: "Red social actualizada correctamente", data: newItemSocial };
        } catch (error) {
            return { success: false, message: "Ocurrió un error con el servidor" };
        }
    }

}