import Testimonio from "@/components/Inicio/Comentarios/Testimonio";
import type { ComentariosCardProps } from "@/types/Comentarios/types";



export default function ComentariosCard({ comentarios, toggleCheck, seleccionados }: ComentariosCardProps) {
    return (
        comentarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {comentarios.map(({ id, nombre, mensaje, ranking, visible }, index) => (
                    <Testimonio
                        id={id}
                        key={id}
                        client_name={nombre}
                        comment={mensaje}
                        rating={ranking}
                        index={index}
                        visible={visible} // Este valor viene del contexto
                        checked={!!seleccionados[id]} // Estado local controlado
                        onCheckToggle={toggleCheck}
                    />
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
                <h2 className="text-2xl font-bold">No hay comentarios</h2>
            </div>
        )
    )
}