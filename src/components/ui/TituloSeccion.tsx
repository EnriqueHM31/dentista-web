interface TituloSeccionProps {
    titulo: string;
    clases?: string;
}


export default function TituloSeccion({ titulo, clases }: TituloSeccionProps) {
    return (
        <h2 className={`text-4xl w-full font-bold text-accent ${clases}`}>{titulo}</h2>
    )
}