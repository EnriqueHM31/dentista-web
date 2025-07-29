import type { DatePickerProps } from "@/types/Citas/types";

export const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange, minDate }) => {
    return (

        <input
            id="fecha"
            name={name}
            type="date"
            className="w-full px-3 py-2 cursor-pointer border border-primary rounded flex justify-between items-center focus:outline-2 focus:outline-primary mt-1"
            value={value}
            min={minDate}
            onChange={(e) => onChange(e)}
        />
    );
};
