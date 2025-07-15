interface BotonItemAsideProps {
    id: string;
    label: string;
    Icon: React.ReactNode;
    isOpen: boolean;
    selected: string;
    handleClickSelected: (id: string) => void;
}

export default function BotonLOgoutAside({ id, label, Icon, isOpen, selected, handleClickSelected }: BotonItemAsideProps) {
    return (
        <button
            onClick={() => handleClickSelected(id)}
            className={`group flex cursor-pointer -center gap-3 w-full text-left p-3 rounded hover:bg-blue-900 transition ${selected === id ? "bg-blue-900" : ""
                }`}
            aria-label={label}
            title={label}
        >
            <span className="text-2xl">{Icon}</span>
            {!isOpen && <span className="truncate">{label}</span>}
        </button>
    )
}