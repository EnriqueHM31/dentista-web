import { useRanking } from "@/hooks/general/useRanking";
import { FaStar } from "react-icons/fa";
import type { StarRatingProps } from "@/types/Comentarios/types";


export default function StarRating({ name, onChange }: StarRatingProps) {

    const { selected, handleMouseEnter, handleMouseLeave, handleClick, rating } = useRanking(onChange);

    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((index) => (
                <button
                    key={index}
                    type="button"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                    className="text-3xl text-yellow-400"
                >
                    <FaStar
                        className={`transition-all cursor-pointer duration-200 ${index <= rating
                            ? "fill-yellow-400"
                            : "fill-white/50"
                            }`}
                    />
                </button>
            ))}
            {/* Campo oculto para incluir el valor en el formulario */}
            <input type="hidden" name={name} value={selected} />
        </div>
    );
}
