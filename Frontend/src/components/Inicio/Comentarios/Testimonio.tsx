import StartsTestimonials from "@/components/Inicio/Comentarios/StartsTestimonials.";
import { FaCheck } from "react-icons/fa6";

interface TestimonioProps {
    client_name: string;
    rating: number;
    comment: string;
    index: number;
    visible?: number | boolean;
    checked?: boolean;
    onCheckToggle?: (index: number) => void;
}

export default function Testimonio({
    client_name,
    rating,
    comment,
    index,
    visible = false,
    checked = visible === true || visible === 1,
    onCheckToggle
}: TestimonioProps) {
    function getRandomPortraitUrl(index: number) {
        const gender = Math.random() < 0.5 ? "men" : "women";
        return `https://randomuser.me/api/portraits/${gender}/${index % 100}.jpg`;
    }

    return (
        <li className="relative flex flex-col gap-3 px-8 py-4 bg-primary text-white rounded-2xl min-h-[30dvh] justify-between">
            {/* Checkbox de selección para visibilidad */}
            {onCheckToggle && (
                <div className="flex flex-wrap justify-center items-center size-10 mx-auto select-none gap-2 rounded-xl bg-amber-200 absolute top-4 right-4">
                    <label className="text-gray-500 w-full h-full relative">
                        <input
                            type="checkbox"
                            id={`visible-${index}`}
                            checked={checked}
                            onChange={() => onCheckToggle(index)}
                            className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
                        />
                        <span
                            className="flex flex-col items-center justify-center rounded-lg shadow-lg transition-all duration-200 cursor-pointer 
               border-gray-700 border-[3px] bg-gray-800 text-white 
               peer-checked:border-green-400 peer-checked:shadow-green-400/10 
               peer-checked:text-green-400 hover:border-green-400 w-full h-full"
                        >
                            {/* ✅ Ícono visible sólo cuando está marcado */}
                            {checked && (
                                <FaCheck className="text-green-400 text-lg" />
                            )}
                        </span>
                    </label>
                </div>


            )}


            <div className="flex-1 flex items-center gap-4">
                <img
                    src={getRandomPortraitUrl(index)}
                    alt="cliente"
                    className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                    <h2 className="text-md md:text-xl xl:text-xl font-bold">{client_name}</h2>
                    <StartsTestimonials numero={rating} />
                </div>
            </div>

            <div className="flex-1 text-start">
                <p>{comment}</p>
            </div>
        </li>
    );
}
