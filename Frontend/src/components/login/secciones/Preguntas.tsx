import Modal from "@/components/General/Modal";
import { usePreguntasContext } from "@/context/Preguntas";
import { useCrearPregunta } from "@/hooks/admin/Preguntas/useCrearPregunta";
import { useEditarPregunta } from "@/hooks/admin/Preguntas/useEditarPregunta";
import { usePreguntas } from "@/hooks/admin/Preguntas/usePreguntas";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import { FiChevronDown, FiChevronUp, FiEdit, FiPlus, FiTrash2, } from "react-icons/fi";
import ModalCrearPregunta from "../Preguntas/ModalCrearPregunta";
import ModalEditarPregunta from "../Preguntas/ModalEditarPregunta";

export default function ListaPreguntas() {

    const { preguntas } = usePreguntasContext();
    const { handleClickActivarModalIndependiente, handleClickDesactivarModal, activeModal } = useModalIndependiente();

    const { expandedIds, toggleExpand, handleClickEliminarPregunta } = usePreguntas();

    const { preguntaSeleccionada, handleEditarPregunta, handleEditarCampoPregunta, handleClickEditar, handledescartarCambios } = useEditarPregunta(handleClickDesactivarModal);

    const { handleCrearPregunta, preguntaForm, handleCambiarCampoPregunta, handledescartarCambiosCrearPregunta } = useCrearPregunta({ handleClickDesactivarModal });

    return (
        <>
            {/* MODAL EDITAR */}
            <Modal
                modalId="editar"
                activeId={activeModal as string}
                onClose={() => handledescartarCambios()}
                clases="md:max-w-2/3 max-w-11/12 flex items-center justify-center scrollbar-invisible"
            >
                <ModalEditarPregunta
                    handleEditarCampoPregunta={handleEditarCampoPregunta}
                    preguntaSeleccionada={preguntaSeleccionada}
                    toggle={() => handledescartarCambios()}
                    handleEditarPregunta={handleEditarPregunta}
                />
            </Modal>

            {/* MODAL CREAR */}
            <Modal
                modalId="crear"
                activeId={activeModal as string}
                onClose={() => handledescartarCambiosCrearPregunta()}
                clases="md:max-w-2/3 max-w-11/12 flex items-center justify-center"
            >
                <ModalCrearPregunta
                    toggle={() => handledescartarCambiosCrearPregunta()}
                    handleCrearPregunta={handleCrearPregunta}
                    preguntaForm={preguntaForm}
                    handleCambiarCampoPregunta={handleCambiarCampoPregunta}
                />
            </Modal>

            {/* UI PRINCIPAL */}
            <div className="max-w-full mx-auto p-0 md:p-4 ">
                <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold capitalize ">Preguntas</h2>
                    <button
                        onClick={() => handleClickActivarModalIndependiente("crear")}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition cursor-pointer"
                        type="button"
                    >
                        <FiPlus size={18} /> Agregar pregunta
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {preguntas.map(({ id, pregunta, respuesta }) => (
                        <div key={id} className="border rounded shadow-sm overflow-hidden">
                            <div className="bg-primary text-white flex justify-between items-center gap-5 md:gap-0 px-4 py-3">
                                <p className="font-semibold">{pregunta}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            handleClickEditar({ id, pregunta, respuesta })
                                            handleClickActivarModalIndependiente("editar");
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
