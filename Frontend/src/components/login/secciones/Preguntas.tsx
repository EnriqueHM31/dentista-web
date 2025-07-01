import Modal from "@/components/general/Modal";
import { useEffect, useState } from "react";
import {
    FiPlus,
    FiEdit,
    FiTrash2,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import { toast } from "sonner";
import ModalEditar from "../Preguntas/ModalEditar";
import ModalCrear from "../Preguntas/ModalCrear";

interface Pregunta {
    id: number;
    pregunta: string;
    respuesta: string;
}

export default function ListaPreguntas() {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null);
    const [pregunta, setPregunta] = useState<string>("");
    const [respuesta, setRespuesta] = useState<string>("");

    const [activeModal, setActiveModal] = useState<"editar" | "crear" | null>(null);

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const obtenerPreguntas = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/preguntas`);
            const { message } = await res.json();
            if (!Array.isArray(message)) throw new Error("Formato inválido");
            setPreguntas(message);
        } catch (err) {
            console.error(err);
            toast.error("Error al cargar preguntas");
        }
    };

    const handleGuardar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Guardando cambios...");
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/preguntas/${preguntaSeleccionada?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pregunta: preguntaSeleccionada?.pregunta,
                    respuesta: preguntaSeleccionada?.respuesta,
                }),
            });

            setPreguntas(prev =>
                prev.map(p =>
                    p.id === preguntaSeleccionada?.id ? { ...p, ...preguntaSeleccionada } : p
                )
            );

            toast.success("Cambios guardados exitosamente", { id: toastId });
            setActiveModal(null);
        } catch (err) {
            toast.error("Error al guardar los cambios " + err, { id: toastId });
        }
    };

    const handleCrearPregunta = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Creando pregunta...");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/preguntas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pregunta, respuesta }),
            });

            if (res.ok) {
                toast.success("Pregunta creada exitosamente", { id: toastId });
                setPregunta("");
                setRespuesta("");
                setActiveModal(null);
                obtenerPreguntas(); // Refrescar la lista
            } else {
                throw new Error();
            }
        } catch {
            toast.error("Error al crear la pregunta", { id: toastId });
        }
    };



    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleClickModalEditarPregunta = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreguntaSeleccionada(prev =>
            prev ? { ...prev, pregunta: e.target.value } : prev
        );
    };

    const handleClickModalEditarRespuesta = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPreguntaSeleccionada(prev =>
            prev ? { ...prev, respuesta: e.target.value } : prev
        );
    };

    const handleClickEliminarPregunta = async (id: number) => {

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/preguntas/${id}`, {
                method: "DELETE",
            });
            setPreguntas(prev => prev.filter(p => p.id !== id));
            toast.success("Pregunta eliminada");
        } catch (err) {
            toast.error("Error al eliminar pregunta" + err);
        }
    }

    return (
        <>
            {/* MODAL EDITAR */}
            <Modal
                modalId="editar"
                activeId={activeModal}
                onClose={() => setActiveModal(null)}
                clases="max-w-1/2 flex items-center justify-center"
            >
                <ModalEditar
                    handleEditarPregunta={handleClickModalEditarPregunta}
                    handleEditarRespuesta={handleClickModalEditarRespuesta}
                    preguntaSeleccionada={preguntaSeleccionada}
                    toggle={() => setActiveModal(null)}
                    handleGuardar={handleGuardar}
                />
            </Modal>

            {/* MODAL CREAR */}
            <Modal
                modalId="crear"
                activeId={activeModal}
                onClose={() => setActiveModal(null)}
                clases="max-w-1/2 flex items-center justify-center"
            >
                <ModalCrear
                    toggle={() => setActiveModal(null)}
                    handleCrearPregunta={handleCrearPregunta}
                    pregunta={pregunta}
                    respuesta={respuesta}
                    setPregunta={setPregunta}
                    setRespuesta={setRespuesta}
                />
            </Modal>

            {/* UI PRINCIPAL */}
            <div className="max-w-full mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
                    <button
                        onClick={() => setActiveModal("crear")}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition cursor-pointer"
                        type="button"
                    >
                        <FiPlus size={18} /> Agregar pregunta
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {preguntas.map(({ id, pregunta, respuesta }) => (
                        <div key={id} className="border rounded shadow-sm overflow-hidden">
                            <div className="bg-primary text-white flex justify-between items-center px-4 py-3">
                                <p className="font-semibold">{pregunta}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setPreguntaSeleccionada({ id, pregunta, respuesta });
                                            setActiveModal("editar");
                                        }}
                                        className="hover:bg-primary-dark rounded p-1 cursor-pointer"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleClickEliminarPregunta(id)}
                                        className="hover:bg-primary-dark rounded p-1 cursor-pointer"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white text-primary px-4 py-3">
                                <p className="text-justify text-sm relative" style={{ whiteSpace: "pre-line" }}>
                                    {respuesta.length > 500 && !expandedIds.includes(id) ? (
                                        <>
                                            {respuesta.slice(0, 500)}...{" "}
                                            <button
                                                onClick={() => toggleExpand(id)}
                                                className="text-primary font-bold py-1 cursor-pointer hover:underline hover:text-primary-dark transition"
                                            >
                                                Ver más <FiChevronDown size={14} className="inline" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {respuesta}{" "}
                                            {respuesta.length > 500 && (
                                                <button
                                                    onClick={() => toggleExpand(id)}
                                                    className="text-primary font-bold py-1 cursor-pointer hover:underline hover:text-primary-dark transition"
                                                >
                                                    Ver menos <FiChevronUp size={14} className="inline" />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
