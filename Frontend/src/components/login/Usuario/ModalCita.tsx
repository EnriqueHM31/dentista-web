import type { ModalCitaProps } from "@/types/Modales/types";
import type { UUID } from "@/types/types";
import { formatearFechaConMes, formatearHora } from "@/utils/Hora";
import { FaCalendarAlt, FaClock, FaEnvelope, FaPhoneAlt, FaTooth, FaUser } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";


export default function ModalCita({ evento, onCitaCompletada, onCitaEliminada, onCitaAceptada }: ModalCitaProps) {
    if (!evento) return null;

    const {
        extendedProps: { nombre, email, telefono, comentarios, servicio, fecha, hora, completada, aceptada },
    } = evento;



    const STATUS_CITA = completada && completada ? {
        icon: FiUserCheck,
        title: "Cita Completada ✅",
        boton_aceptar: false,
        boton_completar: false,
    } : !completada && aceptada ? {
        icon: FiUserCheck,
        title: "Cita Aceptada ℹ️",
        boton_aceptar: false,
        boton_completar: true,
    } : {
        icon: FaClock,
        title: "Cita Pendiente ❌",
        boton_aceptar: true,
        boton_completar: false,
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full p-6 relative">

            {/* Título */}
            <h2 className="text-xl font-semibold text-primary mb-4 text-center">Cita Odontológica</h2>

            {/* Información */}
            <div className="space-y-2 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                    <FaUser className="text-primary text-xl" /> <strong>Paciente:</strong> {nombre}
                </p>
                <p className="flex items-center gap-2">
                    <FaEnvelope className="text-primary text-xl" /> <strong>Email:</strong> {email}
                </p>
                <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-primary text-xl" /> <strong>Teléfono:</strong> {telefono}
                </p>
                <p className="flex items-center gap-2">
                    <FaTooth className="text-primary text-xl" /> <strong>Servicio:</strong> {servicio}
                </p>
                <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary text-xl" /> <strong>Fecha:</strong>{" "}
                    {formatearFechaConMes(new Date(fecha).toLocaleDateString())}
                </p>
                <p className="flex items-center gap-2">
                    <FaClock className="text-primary text-xl" /> <strong>Hora:</strong> {formatearHora(hora)}
                </p>
                {
                    <p className="flex items-center gap-2">
                        <STATUS_CITA.icon className="text-primary text-xl" /> <strong>{STATUS_CITA.title}</strong>
                    </p>
                }
                <p className="mt-2">
                    <strong>Comentarios:</strong> <br /> {comentarios}
                </p >
            </div>

            {/* Acciones */}
            <div className="mt-6 flex justify-end gap-2">
                {
                    STATUS_CITA.boton_completar && (
                        <button
                            onClick={() => onCitaCompletada({ id: evento.id as UUID })}
                            className="px-4 py-2 rounded cursor-pointer bg-green-700 hover:bg-green-800 text-white text-sm">
                            Completar Cita
                        </button>
                    )
                }
                <button
                    onClick={() => onCitaEliminada({ id: evento.id as UUID })}
                    className="px-4 py-2 rounded cursor-pointer bg-red-500 hover:bg-red-800 text-white text-sm"
                >
                    Eliminar cita
                </button>
                {
                    STATUS_CITA.boton_aceptar && (
                        <button
                            onClick={() => onCitaAceptada({ id: evento.id as UUID })}
                            className="px-4 py-2 rounded cursor-pointer bg-primary hover:bg-blue-800 text-white text-sm">
                            Aceptar Cita
                        </button>
                    )
                }
            </div>
        </div>
    );
}
