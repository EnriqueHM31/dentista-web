import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ServicioResponse } from "@/types";
import { crearServicio, eliminarServicio, getServicios } from "@/services/Servicios";
import { esURLValida } from "@/assets/ts/constantes";


export function useGetServicios({ handleClickDesactivarModal }: { handleClickDesactivarModal: () => void }) {

    const [servicios, setServicios] = useState<ServicioResponse[]>([]);
    const formRef = useRef<ServicioResponse[]>([]);

    useEffect(() => {
        const fetchServicios = async () => {
            const { success, message } = await getServicios();
            if (success) {
                setServicios(message);
                formRef.current = message;

            } else {
                toast.error(message || "Error al cargar los servicios");
            }
        };
        fetchServicios();
    }, []);


    const refrescarUpdateServicio = (id: string, updatedValues: { name?: string; description?: string; img?: string }) => {
        const index = formRef.current.findIndex((s) => s.id === id);
        if (index === -1) {
            toast.error("Servicio no encontrado");
            return;
        }

        // Lista blanca de claves válidas
        const allowedKeys: (keyof ServicioResponse)[] = ['name', 'description', 'img'];

        const filteredValues = Object.keys(updatedValues)
            .filter((key): key is keyof { name: string; description: string; img: string } => allowedKeys.includes(key as keyof ServicioResponse))
            .reduce((acc, key) => {
                acc[key] = updatedValues[key];
                return acc;
            }, {} as Partial<{ name: string; description: string; img: string }>);

        formRef.current[index] = { ...formRef.current[index], ...filteredValues };
        setServicios([...formRef.current]);
    };


    const refrescarCrearServicio = ({ id, name, description, img }: ServicioResponse) => {

        setServicios(prev => [...prev, { id, name, description, img }].sort((a, b) => a.name.localeCompare(b.name)));
    }




    const handleEliminarServicio = async (id: `${string}-${string}-${string}-${string}-${string}` | "") => {
        const index = servicios.findIndex((s) => s.id === id);
        if (index === -1) {
            toast.error("Servicio no encontrado");
            return;
        }

        const { success, message } = await eliminarServicio(id);
        if (success) {
            toast.success("Servicio eliminado correctamente");
            formRef.current.splice(index, 1);
            setServicios([...formRef.current]);
        } else {
            toast.error(message || "Error al eliminar el servicio");
        }
    };

    const handleSubmitCrearServicio = async (e: React.FormEvent,) => {

        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const { titulo, descripcion, img } = Object.fromEntries(data.entries()) as { titulo: string, descripcion: string, img: string };

        if (!titulo || !descripcion || !img) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (!esURLValida(img.toString())) {
            toast.error("La imagen no es válida");
            return;
        }

        try {
            const { success, message, servicio } = await crearServicio({ titulo, descripcion, img });

            if (success) {
                toast.success("Servicio creado correctamente");
                handleClickDesactivarModal();
                refrescarCrearServicio(servicio);
            } else {
                toast.error(message || "Error al crear el servicio");
            }
        } catch (error) {
            toast.error("Error de red al crear el servicio");
            console.error(error);
        }

    }



    return { servicios, serviciosRef: formRef, refrescarUpdateServicio, refrescarCrearServicio, handleEliminarServicio, handleSubmitCrearServicio };
}
