import type { BotonItemAsideProps } from "@/types/Menu/types";

export default function BotonItemAside({ id, label, Icon, isOpen, selected, handleClickSelected }: BotonItemAsideProps) {

    return (
        <button
            key={id}
            onClick={() => handleClickSelected(id)}
            className={`group flex z-150 cursor-pointer items-center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === id ? "bg-blue-900" : ""
                }`}
            aria-label={label}
            title={label}
        >
            <span className={`text-2xl `}>
                {Icon}
            </span>
            {!isOpen && <span className="truncate">{label}</span>}
        </button>
    )
}