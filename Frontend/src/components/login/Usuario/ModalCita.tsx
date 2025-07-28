import { FaCalendarAlt, FaClock, FaEnvelope, FaPhoneAlt, FaUser, FaTooth, FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import type { ModalCitaProps } from "@/types/Modales/types";
import type { UUID } from "@/types/types";


export default function ModalCita({ evento, onClose, onCitaCompletada, onCitaEliminada }: ModalCitaProps) {
    if (!evento) return null;

    const {
        extendedProps: { nombre, email, telefono, comentarios, servicio, fecha, hora, completada },
    } = evento;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-primary hover:text-gray-600 transition cursor-pointer"
                >
                    <MdClose className="text-4xl" />
                </button>

                {/* Título */}
                <h2 className="text-xl font-semibold text-primary mb-4 text-center">Cita Odontológica</h2>

                {/* Información */}
                <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex items-center gap-2">
                        <FaUser className="text-primary" /> <strong>Paciente:</strong> {nombre}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" /> <strong>Email:</strong> {email}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-primary" /> <strong>Teléfono:</strong> {telefono}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaTooth className="text-primary" /> <strong>Servicio:</strong> {servicio}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" /> <strong>Fecha:</strong>{" "}
                        {new Date(fecha).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock className="text-primary" /> <strong>Hora:</strong> {hora}
                    </p>
                    {completada ? (
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-primary" /> <strong>Cita completada ✅</strong>
                        </p>
                    ) : (
                        <p className="flex items-center gap-2">
                            <FaClock className="text-primary" /> <strong>Cita Pendiente ❌</strong>
                        </p>
                    )}
                    <p className="mt-2">
                        <strong>Comentarios:</strong> <br /> {comentarios}
                    </p>
                </div>

                {/* Acciones */}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={() => onCitaCompletada({ id: evento.id as UUID })}
                        disabled={completada}
                        className={`px-4 py-2 rounded cursor-pointer   text-white text-sm ${completada ? 'bg-green-700' : 'bg-primary hover:bg-blue-700'}`}
                    >
                        {completada ? 'Cita completada' : 'Completar cita'}
                    </button>
                    <button
                        onClick={() => onCitaEliminada({ id: evento.id as UUID })}
                        className="px-4 py-2 rounded cursor-pointer bg-red-500 hover:bg-red-800 text-white text-sm"
                    >
                        Eliminar cita
                    </button>
                </div>
            </div>
        </div>
    );
}
