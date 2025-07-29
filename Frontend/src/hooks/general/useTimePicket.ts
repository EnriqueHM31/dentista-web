import type { Appointment, TimeSlot } from "@/types/Citas/types";
import { generateAllSlots } from "@/utils/InputHora";
import { useEffect, useRef, useState } from "react";

interface useTimePicketProps {
    name: string;
    date: string;
    appointments: Appointment[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function useTimePicket({ name, date, appointments, onChange }: useTimePicketProps) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const allSlots = generateAllSlots(date, appointments);
        setSlots(allSlots);
    }, [appointments]);

    // Cerrar dropdown si clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (time: string) => {
        onChange({ target: { value: time, name } } as React.ChangeEvent<HTMLSelectElement>);
        setIsOpen(false);
    };

    const handleOpenSelect = () => {
        setIsOpen(!isOpen);
    };


    return { slots, isOpen, handleSelect, ref, handleOpenSelect };
}