import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Tooltip from "@/components/General/Tooltip";
import type { CarouselControlProps } from "@/types/Components/types";


export default function CarouselControl({ type, title, handleClick }: CarouselControlProps) {

    return (
        <Tooltip text={title} position="top">
            <button
                className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 cursor-pointer`}
                title={title}
                onClick={handleClick}
            >
                {
                    type === "previous" ? <FaArrowLeft className="text-neutral-600 dark:text-neutral-200" /> : <FaArrowRight className="text-neutral-600 dark:text-neutral-200" />
                }
            </button>
        </Tooltip>
    );
};