import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import type { AnimatedSelectProps } from "@/types";

export default function AnimatedSelect({ funcion, select, name, options, onChange, clases }: AnimatedSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(select || '');
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dropdownStyles, setDropdownStyles] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (!selected && options.length > 0) {
            setSelected(options[0]);
        }
    }, [options, selected]);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownStyles({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [isOpen]);

    const handleSelect = (value: string) => {
        setSelected(value);
        setIsOpen(false);
        onChange?.(value);

        // Simula un evento si quieres que funcione con un onChange general
        const fakeEvent = {
            target: {
                name: name,
                value: value
            }
        } as React.ChangeEvent<HTMLSelectElement>;

        funcion?.(fakeEvent);
    };


    return (
        <div className="relative max-w-full w-full">
            {/* Hidden native select */}
            <select
                id={name}
                name={name}
                value={selected}
                onChange={(e) => {
                    handleSelect(e.target.value);
                }}
                className="hidden"
                required
            >
                {options.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            {/* Visual Button */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 cursor-pointer ${clases} border border-primary rounded-lg flex justify-between items-center`}
            >
                <span className="text-md md:text-base">{selected.length > 30 ? selected.slice(0, 27) + '...' : selected}</span>
                <FaChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed z-50 border border-primary  rounded-lg shadow-lg max-h-60 overflow-y-auto `}
                        style={{
                            top: dropdownStyles.top,
                            left: dropdownStyles.left,
                            width: dropdownStyles.width,
                        }}
                    >
                        {options.map((opt, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-2 cursor-pointer transition-colors ${clases} text-md md:text-base`}
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
