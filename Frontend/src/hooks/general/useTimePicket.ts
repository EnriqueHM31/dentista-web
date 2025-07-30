import type { TimeSlot } from "@/types/Citas/types";
import type { useTimePicketProps } from "@/types/Components/types";
import { generateAllSlots } from "@/utils/InputHora";
import { useEffect, useRef, useState } from "react";

export function useTimePicket({ name, date, appointments, onChange }: useTimePicketProps) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const ContenedorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const allSlots = generateAllSlots(date, appointments);
        setSlots(allSlots);
    }, [appointments, date]);

    // Cerrar dropdown si clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ContenedorRef.current && !ContenedorRef.current.contains(event.target as Node)) {
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


    return { slots, isOpen, handleSelect, ContenedorRef, handleOpenSelect };
}