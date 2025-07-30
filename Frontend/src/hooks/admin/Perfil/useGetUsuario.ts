import { getUsuario } from "@/services/Usuario";
import type { UsuarioProps } from "@/types/Usuario/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export function useGetUsuario() {
    const [datosUsuario, setDatosUsuario] = useState<UsuarioProps>({ username: "", password: "" });

    useEffect(() => {

        const recuperarDatosInicioSesion = async () => {
            const { success, message, usuario } = await getUsuario();
            if (!success) {
                toast.error(message);
                return;
            }
            setDatosUsuario(usuario);
        }

        recuperarDatosInicioSesion();
    }, []);

    return {
        datosUsuario
    }
}
