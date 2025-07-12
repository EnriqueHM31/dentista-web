import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
    name: string;
    onChange?: (value: number) => void;
}

export default function StarRating({ name, onChange }: StarRatingProps) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number>(0);

    const handleMouseEnter = (index: number) => setHovered(index);
    const handleMouseLeave = () => setHovered(null);

    const handleClick = (index: number) => {
        setSelected(index);
        onChange?.(index);
    };

    const rating = hovered ?? selected;

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
                        className={`transition-all duration-200 ${index <= rating
                            ? "fill-yellow-400"
                            : "fill-yellow-100"
                            }`}
                    />
                </button>
            ))}
            {/* Campo oculto para incluir el valor en el formulario */}
            <input type="hidden" name={name} value={selected} />
        </div>
    );
}
