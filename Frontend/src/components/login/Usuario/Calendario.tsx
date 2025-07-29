import { useCitasCalendario } from '@/hooks/admin/Citas/useCitasCalendario';
import "@/styles/Calendario.css";
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import ModalCita from './ModalCita';


export default function CalendarioCitas() {
    const { citasFormateadas, modalOpen, eventoSeleccionado, handleEventClick, onClose, onCitaCompletada, onCitaEliminada, onCitaAceptada } = useCitasCalendario();

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

            {modalOpen && eventoSeleccionado && (
                <ModalCita
                    evento={eventoSeleccionado}
                    onClose={onClose}
                    onCitaCompletada={onCitaCompletada}
                    onCitaEliminada={onCitaEliminada}
                    onCitaAceptada={onCitaAceptada}
                />
            )}
        </>
    );
}
