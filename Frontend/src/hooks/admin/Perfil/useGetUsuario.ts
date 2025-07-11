import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useGetUsuario() {
    const [datosUsuario, setDatosUsuario] = useState<{ username: string, password: string }>({ username: "", password: "" });


    useEffect(() => {

        const recuperarDatosInicioSesion = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/usuario`)

            const { success, message } = await response.json();

            if (!success) {
                toast.error(message);
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
