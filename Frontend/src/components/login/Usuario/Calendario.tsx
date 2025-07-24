import FullCalendar from '@fullcalendar/react';
import type { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import esLocale from '@fullcalendar/core/locales/es';
import "@/styles/Calendario.css"
interface Evento {
    id: string;
    title: string;
    start: string;
    description: string;
    backgroundColor: string;
}

export default function CalendarioCitas() {
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);

    const eventos: Evento[] = [
        {
            id: '1',
            title: 'Se abre Examen T1',
            start: '2025-07-24T08:24:00',
            description: 'Lee con atención y contesta',
            backgroundColor: '#F97316',
        },
        {
            id: '2',
            title: 'Vencimiento de tarea',
            start: '2025-07-24T10:00:00',
            description: 'Sube tu archivo antes del cierre',
            backgroundColor: '#EF4444',
        },
    ];

    const handleEventClick = (info: EventClickArg) => {
        const e = info.event;
        setEventoSeleccionado({
            id: e.id,
            title: e.title,
            start: e.start ? e.start.toISOString() : '',
            description: (e.extendedProps.description as string) || '',
            backgroundColor: e.backgroundColor || '#000',
        });
        setModalOpen(true);
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={eventos}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                locale={esLocale}
                height={'auto'}
            />

            {/* Modal básico */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-30 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h2 className="font-bold text-lg">{eventoSeleccionado?.title}</h2>
                        <p className="text-sm mt-2">
                            📅 {eventoSeleccionado ? new Date(eventoSeleccionado.start).toLocaleString() : ''}
                        </p>
                        <p className="mt-2">{eventoSeleccionado?.description}</p>
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => setModalOpen(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
