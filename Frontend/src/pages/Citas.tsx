import { DatePicker } from "@/components/General/DatePick";
import AnimatedSelect from "@/components/General/Select";
import CustomTimePickerePicker from "@/components/General/TimePick";
import { useServicioContext } from "@/context/Servicio";
import { useCitas } from "@/hooks/inicio/useCitas";
import { useTiempo } from "@/hooks/admin/Citas/useTiempo";
import { FaInfo } from "react-icons/fa6";
import { useModalIndependiente } from "@/hooks/general/useModalIndependiente";
import Modal from "@/components/General/Modal";
import ServicioInfo from "@/components/Contacto/InfoServicios";
import { useMemo } from "react";
import { useCitasContext } from "@/context/Citas";
import type { Appointment } from "@/types/Citas/types";

export default function Citas() {

    const { handleChangeCrearCita, handleSubmitCrearCita, FormCrearCita } = useCitas();

    const { servicios: ArrayServicios } = useServicioContext();
    const { citas } = useCitasContext();

    const { hora, fecha, handleDateChange, handleTimeChange, minDate, handleResetearHora } = useTiempo({ FormCrearCita, handleChangeCrearCita });

    const { activeModal, handleClickActivarModalIndependiente, handleClickDesactivarModal } = useModalIndependiente()


    const allAppointments = useMemo(() => {
        handleResetearHora();
        return citas
            .map((cita) => {
                const servicio = ArrayServicios.find(s => s.titulo === cita.servicio);
                if (!servicio) return null;
                return {
                    id: cita.id,
                    fecha: cita.fecha,
                    hora: cita.hora,
                    duration: servicio.duration,
                };
            })
            .filter(Boolean) as Appointment[];
    }, [citas, ArrayServicios]);

    return (

        <>

            <Modal
                activeId={'info-servicios'}
                modalId={activeModal as string}
                onClose={handleClickDesactivarModal}
                clases="max-w-11/12 md:max-w-3/4"
            >
                <ServicioInfo servicios={ArrayServicios} />
            </Modal>

            <section className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center px-0 md:px-4 py-12 mt-10 max-w-11/12 md:max-w-10/12 mx-auto w-full">
                <div className="flex flex-col lg:flex-row max-w-full md:max-w-11/12 w-full bg-white border border-gray-500 rounded-xl shadow-2xl ">
                    <div className="w-full px-6 py-8 md:p-12 flex flex-col justify-center gap-6 flex-4">
                        <header className="relative">
                            <h1 className="text-xl md:text-3xl font-bold text-primary">
                                Bienvenido agenda tu cita ahora...
                            </h1>
                            <p className="text-gray-500 mt-2 text-sm md:text-base">
                                Completa el formulario para agendar tu cita
                            </p>

                            <button onClick={() => handleClickActivarModalIndependiente('info-servicios')} className="absolute top-2 right-2 bg-primary text-white rounded-full size-10 flex justify-center items-center cursor-pointer hover:bg-primary/90 transition">
                                <FaInfo />
                            </button>
                        </header>

                        <form onSubmit={(e) => handleSubmitCrearCita(e, allAppointments)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre completo */}
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="text-sm text-gray-600">Nombre completo</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    required
                                    value={FormCrearCita.nombre}
                                    onChange={handleChangeCrearCita}
                                    placeholder="Juan Pérez"
                                    className="mt-1 px-4 py-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Correo */}
                            <div className="flex flex-col">
                                <label htmlFor="correo" className="text-sm text-gray-600">Correo electrónico</label>
                                <input
                                    id="correo"
                                    type="email"
                                    name="email"
                                    autoComplete="on"
                                    value={FormCrearCita.email}
                                    onChange={handleChangeCrearCita}
                                    required
                                    placeholder="juan@example.com"
                                    className="mt-1 px-4 py-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="flex flex-col">
                                <label htmlFor="telefono" className="text-sm text-gray-600">Teléfono</label>
                                <input
                                    id="telefono"
                                    type="tel"
                                    name="telefono"
                                    required
                                    placeholder="55 1234 5678"
                                    value={FormCrearCita.telefono}
                                    onChange={handleChangeCrearCita}
                                    pattern="[0-9]{10}"
                                    className="mt-1 px-4 py-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Fecha */}
                            <div className="flex flex-col ">
                                <label htmlFor="fecha" className="text-sm text-gray-600">Fecha de la cita</label>
                                <DatePicker
                                    name="fecha"
                                    value={FormCrearCita.fecha}
                                    minDate={minDate}
                                    onChange={handleDateChange}
                                />
                            </div>

                            {/* Servicio odontológico */}
                            <div className="flex flex-col">
                                <label htmlFor="servicio" className="text-sm text-gray-600">Servicio odontológico</label>
                                <AnimatedSelect
                                    name="servicio"
                                    select={FormCrearCita.servicio}
                                    onChange={handleChangeCrearCita}
                                    selectClass="bg-white border border-primary mt-1 text-primary"
                                    itemClass="bg-white text-primary"
                                    itemHoverClass="hover:bg-primary hover:text-white"
                                    options={ArrayServicios.map(({ titulo }) => titulo)}
                                />
                            </div>

                            {/* Hora de la cita */}
                            <div className="flex flex-col">
                                <label htmlFor="hora" className="text-sm text-gray-600">Hora de la cita</label>
                                <CustomTimePickerePicker
                                    name="hora"
                                    date={fecha}
                                    appointments={allAppointments}
                                    value={hora}
                                    onChange={handleTimeChange}

                                />
                            </div>

                            {/* Comentarios */}
                            <div className="md:col-span-2 flex flex-col">
                                <label htmlFor="comentarios" className="text-sm text-gray-600">Comentarios adicionales</label>
                                <textarea
                                    id="comentarios"
                                    name="comentarios"
                                    value={FormCrearCita.comentarios}
                                    onChange={handleChangeCrearCita}
                                    placeholder="Ej. Tengo molestias en una muela..."
                                    className="mt-1 px-4 py-2 border border-primary rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                                ></textarea>
                            </div>

                            {/* Botón */}
                            <div className="md:col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white px-6 py-2 rounded transition-all"
                                >
                                    Agendar cita
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Imagen lateral */}
                    <div className="flex-3">
                        <img
                            src="https://imgs.search.brave.com/9-xigrgjvKyqnCgUydFr2ebwAgD5Vssd4NiNAStnTXw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c29ycmlhc2VtcHJl/cXVlcHVkZXIuY29t/LmJyL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzAxL3NpZ25p/ZmljYWRvLXNpZ2xh/cy1vZG9udG9sb2dp/YS1wZXJpb2RvbnRv/LmpwZw"
                            alt="Fondo odontología"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
