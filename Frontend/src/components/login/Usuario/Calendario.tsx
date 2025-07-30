import Modal from '@/components/General/Modal';
import { useCitasCalendario } from '@/hooks/admin/Citas/useCitasCalendario';
import "@/styles/Calendario.css";
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import ModalCita from './ModalCita';


export default function CalendarioCitas() {
    const { citasFormateadas, eventoSeleccionado, handleEventClick, onCitaCompletada, onCitaEliminada, onCitaAceptada, isOpen, onClose } = useCitasCalendario();


    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={citasFormateadas}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay',
                }}
                eventClassNames={`cursor-pointer`}
                locale={esLocale}
                height="auto"
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
            />

            {isOpen && eventoSeleccionado && (

                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    clases="max-w-11/12 md:max-w-1/2 w-full"
                >
                    <ModalCita
                        evento={eventoSeleccionado}
                        onCitaCompletada={onCitaCompletada}
                        onCitaEliminada={onCitaEliminada}
                        onCitaAceptada={onCitaAceptada}
                    />
                </Modal >
            )
            }
        </>
    );
}
