import type { TimeSlot, Appointment } from "@/types/Citas/types";

export function normalizeHHMM(timeStr: string) {
    const [hStr, mStr] = timeStr.split(':');
    const h = hStr.padStart(2, '0');
    const m = mStr.padStart(2, '0');
    return `${h}:${m}`;
}

export function parseToMinutes(hhmm: string) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
}

export function minutesToHHMM(mins: number) {
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
}
export function parseFechaToISO(fecha: string): string {
    // Si ya está en formato YYYY-MM-DD, se retorna igual
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;

    // Convertir de DD/MM/YYYY a YYYY-MM-DD
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)) {
        const [dia, mes, año] = fecha.split("/");
        return `${año}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }

    throw new Error("Formato de fecha no válido. Usa 'YYYY-MM-DD' o 'DD/MM/YYYY'.");
}

export function generateAllSlots(
    selectedDate: string,
    appointments: Appointment[],
): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const start = 9 * 60;  // 09:00
    const end = 18 * 60;   // 18:00

    // Convertir la fecha seleccionada al formato ISO válido
    const fechaISO = parseFechaToISO(selectedDate);

    const now = new Date();
    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Mexico_City",
    });
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todays = appointments
        .filter(a => a.fecha.slice(0, 10) === fechaISO)
        .map(a => ({
            ...a,
            hora: normalizeHHMM(a.hora.slice(0, 5)),
        }));

    const HorasCitaExacta = todays.map(a => a.hora);

    for (let m = start; m <= end; m += 30) {
        const slot = minutesToHHMM(m);

        // Evitar mostrar horarios pasados si es el día actual
        if (fechaISO === today && m <= currentMinutes) continue;

        const slotStart = m;
        const slotEnd = slotStart;

        let isAvailable = true;

        for (const a of todays) {
            const aStart = parseToMinutes(a.hora);
            const aEnd = aStart + a.duration;

            const hayTraslape = slotStart < aEnd && slotEnd > aStart;

            if (hayTraslape) {
                isAvailable = false;
                break;
            }
        }

        // También marcamos como ocupado si la hora coincide exacta
        if (HorasCitaExacta.includes(slot)) {
            isAvailable = false;
        }

        slots.push({ time: slot, available: isAvailable });
    }

    return slots;
}

export function isSlotRangeAvailable(
    selectedTime: string,
    duration: number,
    slots: { time: string; available: boolean }[]
): boolean {
    const slotDuration = 30; // minutos entre cada slot, ajustar si usas otro intervalo
    const requiredSlots = duration / slotDuration;

    // Buscar el índice del slot donde empieza la cita
    const startIndex = slots.findIndex(slot => slot.time === selectedTime);
    if (startIndex === -1) return false; // slot no encontrado

    // Verificar que todos los slots necesarios estén disponibles
    for (let i = 0; i < requiredSlots; i++) {
        const slot = slots[startIndex + i];
        if (!slot || !slot.available) {
            return false; // slot faltante o no disponible
        }
    }

    return true; // todos los slots requeridos están disponibles
}