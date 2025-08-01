import { ComentariosProvider } from "@/provider/Comentarios";
import { EspecialistasProvider } from "@/provider/Especialistas";
import { PreguntasProvider } from "@/provider/Preguntas";

export default function WrapperContextSite({ children }: { children: React.ReactNode }) {
    return (
        <PreguntasProvider>
            <ComentariosProvider>
                <EspecialistasProvider>
                    {children}
                </EspecialistasProvider>
            </ComentariosProvider>
        </PreguntasProvider>
    )
}