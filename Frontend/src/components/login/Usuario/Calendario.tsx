import { Calendar, CustomProvider } from 'rsuite';
import esES from 'rsuite/esm/locales/es_ES';
import '@/styles/Calendario.css';

export default function CalendarioCitas() {
    return (
        <CustomProvider locale={esES}>
            <Calendar
                className="bg-primary text-white rounded-2xl p-5 flex flex-col items-center justify-center gap-4"
                isoWeek
            />
        </CustomProvider>
    );
}
