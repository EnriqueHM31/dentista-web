import type { ServicioResponse } from "@/types";

export const getServicios = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios`);
    const { success, message } = await response.json();
    return { success, message };
}

export const crearServicio = async ({ titulo, descripcion, img }: { titulo: string, descripcion: string, img: string }) => {


    const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios`, {
        method: "POST",
        body: JSON.stringify({ titulo, descripcion, img }),
        headers: {
            "content-type": "application/json",
        }
    });

    const { success, message, servicio } = await response.json();

    return { success, message, servicio };
}

export const modificarServicio = async (id: string, data: Partial<ServicioResponse>) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/servicios/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            }
        }
    );

    const { success, message } = await response.json();

    return { success, message };
}

export const eliminarServicio = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    });

    const { success, message } = await response.json();

    return { success, message };
}
