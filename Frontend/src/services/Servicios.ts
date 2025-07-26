import type { ServicioProps } from "@/types/Servicios/types";
import { VITE_API_URL } from "@/config";
import type { UUID } from "@/types/types";

export const getServicios = async () => {
    const response = await fetch(`${VITE_API_URL}/servicios`);

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener los servicios" };
    }
}

export const getServiciosDisponibles = async () => {
    const response = await fetch(`${VITE_API_URL}/servicios/disponibles`);

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al obtener los servicios disponibles" };
    }
}

export const crearServicio = async ({ titulo, descripcion, img, duration }: { titulo: string, descripcion: string, img: string, duration: number }) => {

    const response = await fetch(`${VITE_API_URL}/servicios`, {
        method: "POST",
        body: JSON.stringify({ titulo, descripcion, img, duration }),
        headers: {
            "content-type": "application/json",
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al crear el servicio" };
    }
}

export const modificarServicio = async (id: UUID, data: Partial<ServicioProps>) => {
    const response = await fetch(`${VITE_API_URL}/servicios/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        }
    }
    );

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al modificar el servicio" };
    }
}

export const eliminarServicio = async (id: string) => {
    const response = await fetch(`${VITE_API_URL}/servicios/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return { success: false, message: "Error al eliminar el servicio" };
    }
}
