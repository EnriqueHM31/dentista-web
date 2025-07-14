import { useContext, useEffect, useState } from "react";
import { ComentariosContext } from "@/context/Comentarios";
import Testimonio from "@/components/Inicio/Comentarios/Testimonio";
import { toast } from "sonner";

export default function Comentarios() {
    const { comentarios } = useContext(ComentariosContext);

    const [seleccionados, setSeleccionados] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (comentarios.length > 0) {
            const inicial = Object.fromEntries(
                comentarios.map((c) => [c.id, !!c.visible])
            );
            setSeleccionados(inicial);
        }
    }, [comentarios]);


    async function updateComentarioVisibilidad(id: string, visible: boolean) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comentarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ visible }),
            credentials: "include", // si usas cookies para auth
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Error al actualizar visibilidad");
        }

        return await response.json();
    }


    // Alterna el estado del checkbox
    const toggleCheck = (index: number) => {
        const id = comentarios[index].id;
        setSeleccionados((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Envía los cambios al backend
    const guardarSeleccion = async () => {
        try {
            const actualizaciones = comentarios.map((c) => ({
                id: c.id,
                visible: !!seleccionados[c.id],
            }));

            await Promise.all(
                actualizaciones.map(({ id, visible }) =>
                    updateComentarioVisibilidad(id, visible)
                )
            );

            toast.success("Cambios guardados correctamente");
        } catch {
            toast.error("Error al guardar los cambios");
        }
    };


    return (
        <div className="max-w-full mx-auto p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Comentarios de los clientes</h2>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={guardarSeleccion}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Guardar selección
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {comentarios.map(({ id, nombre, mensaje, ranking, visible }, index) => (
                    <Testimonio
                        key={id}
                        client_name={nombre}
                        comment={mensaje}
                        rating={ranking}
                        index={index}
                        visible={visible} // Este valor viene del contexto
                        checked={!!seleccionados[id]} // Estado local controlado
                        onCheckToggle={toggleCheck}
                    />
                ))}
            </div>


        </div>
    );
}
