import type { TimePickerProps } from "@/types/Citas/types";
import { FaChevronDown } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import { useTimePicket } from '@/hooks/general/useTimePicket';

export default function TimePicker({ name, date, appointments, value, onChange }: TimePickerProps) {
    const { slots, isOpen, handleSelect, ref, handleOpenSelect } = useTimePicket({ name, date, appointments, onChange });

    return (

        <div className='relative' ref={ref}>

            <select name={name} id={name} value={value} onChange={onChange} className="hidden"></select>
            <button
                type="button"
                onClick={handleOpenSelect}
                className="w-full px-3 py-2 cursor-pointer border border-primary rounded flex justify-between items-center focus:outline-2 focus:outline-primary mt-1"
            >
                <span className="truncate">{value || slots[0]?.time}</span>
                <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto border border-primary rounded-lg bg-white shadow-lg"
                    >
                        {slots.map(({ time, available }, index) => {
                            const isFirst = index === 0;
                            const isLast = index === slots.length - 1;

                            return (
                                <li
                                    key={time}
                                    onClick={() => available && handleSelect(time)}
                                    className={`px-4 py-2 cursor-pointer select-none
                                    ${!available ? ' cursor-not-allowed hover:text-inherit' : ''}
                                    ${!(isFirst || isLast) ? (available ? 'text-green-700 hover:bg-green-700 hover:text-white' : 'text-red-700 hover:bg-red-800 hover:text-white') : ''}
                                    `}
                                >
                                    {time}
                                    {!isFirst && !isLast && ` ${available ? '(Disponible)' : '(Ocupado)'}`}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
