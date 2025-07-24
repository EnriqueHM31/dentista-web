import type { TituloSeccionProps } from "@/types/Components/types";

export default function TituloSeccion({ titulo, clases }: TituloSeccionProps) {
    return (
        <h2 className={`xl:text-4xl lg:text-3xl md:text-2xl text-2xl w-full font-bold text-accent ${clases}`}>{titulo}</h2>
    )
}