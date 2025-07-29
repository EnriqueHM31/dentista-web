import type { DatePickerProps } from "@/types/Citas/types";
import { useRef } from "react";

export const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange, minDate }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    return (

        <div
            className="w-full"
            onClick={() => inputRef.current?.showPicker?.()}
        >
            <input
                ref={inputRef}
                id="fecha"
                name={name}
                type="date"
                className="w-full px-3 py-2 cursor-pointer border border-primary rounded appearance-none focus:outline-2 focus:outline-primary mt-1"
                value={value}
                min={minDate}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
};
