import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ServicioResponse {
    id: `${string}-${string}-${string}-${string}-${string}`;
    name: string;
    description: string;
    img: string;
}

export function useGetServicios() {

    const [servicios, setServicios] = useState<ServicioResponse[]>([]);
    const formRef = useRef<ServicioResponse[]>([]);


    useEffect(() => {
        const fetchServicios = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios`);
            const { success, message } = await response.json();
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


    const handleEliminarServicio = async (id: `${string}-${string}-${string}-${string}-${string}`) => {
        const index = servicios.findIndex((s) => s.id === id);
        if (index === -1) {
            toast.error("Servicio no encontrado");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/servicios/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            }
        });

        const { success, message } = await response.json();

        if (success) {
            toast.success("Servicio eliminado correctamente");
            formRef.current.splice(index, 1);
            setServicios([...formRef.current]);
        } else {
            toast.error(message || "Error al eliminar el servicio");
        }
    };



    return { servicios, serviciosRef: formRef, refrescarUpdateServicio, handleEliminarServicio };
}
