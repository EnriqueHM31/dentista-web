import { getUsuario } from "@/services/Usuario";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UsuarioProps } from "@/types/Usuario/types";


export function useGetUsuario() {
    const [datosUsuario, setDatosUsuario] = useState<UsuarioProps>({ username: "", password: "" });

    useEffect(() => {

        const recuperarDatosInicioSesion = async () => {
            const { success, message } = await getUsuario();
            if (!success) {
                toast.error(message);
                return;
            }
            const usuario = message[0]
            setDatosUsuario({ username: usuario.username, password: usuario.password });
        }

        recuperarDatosInicioSesion();
    }, []);
    return {
        datosUsuario
    }
}
