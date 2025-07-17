import StartsTestimonials from "@/components/Inicio/Comentarios/StartsTestimonials.";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useTestimonio } from "@/hooks/general/useTestimonio";

interface TestimonioProps {
    id?: string
    client_name: string;
    rating: number;
    comment: string;
    index: number;
    visible?: number | boolean;
    checked?: boolean;
    onCheckToggle?: (index: number) => void;
    movil?: boolean;
}

export default function Testimonio({ id, client_name, rating, comment, index, visible = false, checked = visible === true || visible === 1, onCheckToggle, movil = false }: TestimonioProps) {

    const { getRandomPortraitUrl, handleEliminarComentario } = useTestimonio();

    return (
        <li className="relative flex flex-col gap-3 px-4 md:px-8 py-4 bg-primary text-white rounded-2xl h-auto justify-between ">
            {/* Checkbox de selección para visibilidad */}
            {onCheckToggle && !movil && (
                <div className="flex flex-wrap justify-center items-center size-7 mx-auto select-none gap-2 rounded-xl bg-amber-200 absolute top-4 right-4 md:right-14">
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
            {
                !movil && (
                    <button className="flex flex-wrap justify-center items-center size-7 mx-auto select-none gap-2 rounded-xl  absolute top-16 md:top-4 right-4 bg-red-500 text-white hover:bg-red-800 hover:text-white transition duration-300 ease-in-out"
                        onClick={() => handleEliminarComentario(id as `${string}-${string}-${string}-${string}-${string}`)}
                    >
                        <FaTrash />
                    </button>
                )
            }


            <div className="flex-1 flex items-center gap-4 ">
                <img
                    src={getRandomPortraitUrl(index)}
                    alt="cliente"
                    className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2 ">
                    <h2 className="text-base md:text-xl xl:text-xl font-bold ">{client_name}</h2>
                    <StartsTestimonials numero={rating} />
                </div>
            </div>

            <div className="flex-1 text-start">
                <p>{comment}</p>
            </div>
        </li>
    );
}
