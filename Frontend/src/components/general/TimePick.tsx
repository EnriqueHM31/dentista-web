import { useEffect, useState } from 'react';
import type { TimeSlot, TimePickerProps } from "@/types/Citas/types";
import { generateAllSlots } from "@/utils/InputHora";


export const TimePicker: React.FC<TimePickerProps> = ({ name, date, appointments, value, onChange }) => {
    const [slots, setSlots] = useState<TimeSlot[]>([]);

    useEffect(() => {
        const allSlots = generateAllSlots(date, appointments);
        setSlots(allSlots);
    }, [appointments]);

    console.log(slots);

    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e)}
            className="w-full px-3 py-2 cursor-pointer border border-primary rounded-lg flex justify-between items-center focus:outline-2 focus:outline-primary mt-1"
        >
            {slots.map(({ time, available }, index) => {
                const isFirst = index === 0;
                const isLast = index === slots.length - 1;

                const style = (isFirst || isLast)
                    ? {}
                    : {
                        color: available ? 'green' : 'red',
                        backgroundColor: available ? '#e6ffed' : '#ffe6e6',
                    };

                return (
                    <option
                        key={time}
                        value={time}
                        disabled={!available}
                        style={style}
                    >
                        {time}
                        {!isFirst && !isLast && ` ${available ? '(Disponible)' : '(Ocupado)'}`}
                    </option>
                );
            })}
        </select>
    );
};
