import type { SelectProps } from "@/types/Components/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function AnimatedSelect({
    funcion,
    select,
    name,
    options,
    onChange,
    selectClass = "",
    menuClass = "",
    itemClass = "",
    itemHoverClass = "",
    textClass = "",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(select || "");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelected(select || options[0] || "");
    }, [select, options]);


    const handleSelect = (value: string) => {
        setSelected(value);
        setIsOpen(false);

        const fakeEvent = {
            target: {
                name: name,
                value: value,
            },
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange?.(fakeEvent);
        funcion?.(fakeEvent);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-full">
            {/* Hidden native select */}
            <select
                id={name}
                name={name}
                value={selected}
                onChange={(e) => handleSelect(e.target.value)}
                className="hidden"
                required
            >
                {options.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            {/* Custom visual button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3 py-2 cursor-pointer border border-primary rounded flex justify-between items-center ${selectClass} focus:outline-2 focus:outline-primary`}
            >
                <span className={`text-md md:text-base truncate whitespace-nowrap overflow-hidden text-ellipsis ${textClass}`}>
                    {selected}
                </span>
                <FaChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-10 mt-2 max-h-60 min-w-full overflow-y-auto border border-primary rounded-lg shadow-lg ${menuClass}`}
                    >
                        {options.map((opt, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-2 cursor-pointer transition-colors ${itemClass} ${itemHoverClass}`}
                            >
                                {opt}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
