import StartsTestimonials from "@/components/Inicio/Comentarios/StartsTestimonials.";

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
                <input
                    type="checkbox"
                    name="visible"
                    id={`visible-${index}`}
                    checked={checked}
                    onChange={() => onCheckToggle(index)}
                    className="absolute top-3 right-3 w-5 h-5 accent-white cursor-pointer"
                    title="Mostrar públicamente"
                />
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
