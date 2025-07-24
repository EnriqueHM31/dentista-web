import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import "@/styles/Calendario.css";
import ModalCita from './ModalCita';
import { useCitasCalendario } from '@/hooks/admin/Citas/useCitasCalendario';


export default function CalendarioCitas() {
    const { citasFormateadas, modalOpen, eventoSeleccionado, handleEventClick, onClose, onCitaCompletada, onCitaEliminada } = useCitasCalendario();

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
                locale={esLocale}
                height="auto"
            />

            {modalOpen && eventoSeleccionado && (
                <ModalCita
                    evento={eventoSeleccionado}
                    onClose={onClose}
                    onCitaCompletada={onCitaCompletada}
                    onCitaEliminada={onCitaEliminada}
                />
            )}
        </>
    );
}
