import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import type { AnimatedSelectProps } from "@/types";


export default function AnimatedSelect({ name, options, onChange }: AnimatedSelectProps) {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();

    const handleSelect = (value: string) => {
        setSelected(value);
        setIsOpen(false);
        onChange?.(value);
    };

    return (
        <div className="relative w-64">
            {/* Hidden native select for form submission */}
            <select
                id={id}
                name={name}
                value={selected}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleSelect(e.target.value)
                }
                className="hidden"
                required
            >
                {options.map((opt, i) => (
                    <option key={i} >
                        {opt}
                    </option>
                ))}
            </select>

            {/* Visual Select */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-white text-primary rounded-lg flex justify-between items-center"
            >
                <span>{selected}</span>
                <FaChevronDown
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-full bg-white border border-primary text-primary rounded-lg shadow-lg z-10 overflow-hidden"
                    >
                        {options.map((opt, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelect(opt)}
                                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
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
