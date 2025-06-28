import { useState } from "react";
import { TbWindowMaximize } from "react-icons/tb";

interface FAQItemProps {
    pregunta: string;
    respuesta: string;
}

export default function FAQItem({ pregunta, respuesta }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button className="w-full bg-primary text-white rounded-xl overflow-hidden shadow-md h-full min-h-30 flex flex-col justify-between cursor-pointer"

            onClick={() => setIsOpen((prev) => !prev)}
        >
            <div
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none flex-1 min-h-20 "
            >
                <h2 className="text-md font-semibold  flex-4">{pregunta}</h2>
                <TbWindowMaximize
                    className={`transition-transform duration-300 text-2xl ${isOpen ? "rotate-180" : "rotate-0"} flex-1`}
                />
            </div>

            {isOpen && (
                <div
                    className="p-4 overflow-hidden text-xs text-white/60 flex-1"
                >
                    <p>{respuesta}</p>
                </div>
            )}
        </button>
    );
}
