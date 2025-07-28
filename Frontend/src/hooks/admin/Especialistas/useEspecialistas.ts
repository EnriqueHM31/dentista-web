import { createEspecialista, deleteEspecialista, updateEspecialista } from "@/services/Especialistas";
import { esURLValida } from "@/utils/constantes";
import { ExistenCambiosEspecialista } from "@/constants/Especialista";
import { INITIAL_ESPECIALISTA, INITIAL_ESPECIALISTA_CREAR } from "@/constants/Especialistas";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";
import { toast } from "sonner";
import { useEspecialistasContext } from "@/context/Especialistas";
import { useRef, useState } from "react";
import { useServicioContext } from "@/context/Servicio";
import type { EspecialistaEditarProps, EspecialistaProps, FormCrearEspecialistaProps, InitialEspecialistaProps } from "@/types/Especialistas/types";
import type { PropsHookEspecialistas } from "@/types/Especialistas/types";
import type { UUID } from "@/types/types";

export function useEspecialistas({ toggle, handleClickDesactivarModal }: PropsHookEspecialistas) {

    const { refrescarEspecialistasEditar, refrescarEspecialistasEliminar, refrescarEspecialistasCrear } = useEspecialistasContext();

    const { serviciosDisponibles, refrescarServiciosDisponiblesAñadir, refrescarServiciosDisponiblesEliminar, servicios } = useServicioContext();

    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<EspecialistaProps | null>(null);

    const [especialistaCrear, setEspecialistaCrear] = useState<FormCrearEspecialistaProps>(INITIAL_ESPECIALISTA);

    const especialistaRef = useRef<FormCrearEspecialistaProps>(INITIAL_ESPECIALISTA);

    const handleOpen = (especialista?: EspecialistaProps, modal?: string) => {
        setEspecialistaSeleccionado(especialista || null);
        especialistaRef.current = especialista || INITIAL_ESPECIALISTA;
        toggle(modal || "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEspecialistaSeleccionado((prev) =>
            prev ? { ...prev, [name]: value } : null
        );
    };

    const handleEditarEspecialista = async (e: React.FormEvent, id: UUID) => {
        e.preventDefault();

        const camposCambiados = ExistenCambiosEspecialista({ especialistaSeleccionado, especialistaRef });

        const keysCambios = Object.keys(camposCambiados);

        if (keysCambios.length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        if (keysCambios.includes("servicio")) {
            const servicioDisponible = servicios.find(servicio => servicio.titulo === camposCambiados.servicio);
            if (!servicioDisponible) {
                toast.error("El servicio no está disponible");
                return;
            }
            camposCambiados.servicio = servicioDisponible.id;
        }

        if (keysCambios.includes("avatar")) {
            if (!esURLValida(camposCambiados.avatar)) {
                toast.error("La URL de la imagen no es válida");
                return;
            }
        }

        if (keysCambios.includes("linkedin")) {
            if (!esURLValida(camposCambiados.linkedin)) {
                toast.error("La URL de LinkedIn no es válida");
                return;
            }
        }

        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de guardar los cambios?",
            textoAccion: "Guardar",
            onConfirmar: async () => editarEspecialista({ id, camposCambiados }),
            textoCancelar: "Cancelar",
            onCancelar: () => toast.dismiss("Cancelando cambios"),
        });
    }

    const handleDescartarCambiosEditarEspecialista = () => {
        const sonIguales = Object.keys(especialistaRef.current).every(
            key => especialistaRef.current[key as keyof FormCrearEspecialistaProps] === especialistaSeleccionado?.[key as keyof FormCrearEspecialistaProps]
        );

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de descartar los cambios?",
                textoAccion: "Descartar",
                onConfirmar: handleClickDesactivarModal,
            });
        }
    };

    const handleDelete = async (especialista: EspecialistaProps) => {
        mostrarToastConfirmacion({
            mensaje: "¿Estás seguro de eliminar este especialista?",
            textoAccion: "Eliminar",
            onConfirmar: async () => eliminarEspecialista(especialista),
        });
    };

    const handleChangeCrearEspecialista = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEspecialistaCrear((prev) => ({ ...prev, [name]: value }));
    };

    const handleCrearEspecialista = async (e: React.FormEvent) => {
        e.preventDefault();
        const { avatar, linkedin, servicio } = especialistaCrear;

        const servicioDisponible = serviciosDisponibles.find((servicioObtener) => servicioObtener.titulo === servicio);

        if (!servicioDisponible) {
            toast.error("El servicio no está disponible");
            return;
        }

        if (!esURLValida(avatar)) {
            toast.error("La URL de la imagen no es válida");
            return;
        }

        if (!esURLValida(linkedin)) {
            toast.error("La URL de LinkedIn no es válida");
            return;
        }

        const newEspecialista = { ...especialistaCrear, servicio: servicioDisponible.id };

        try {
            const { success, message, especialista: especialistaCreado } = await createEspecialista(newEspecialista);

            if (success) {
                toast.success(message);
                refrescarEspecialistasCrear(especialistaCreado);
                refrescarServiciosDisponiblesEliminar(servicioDisponible.id);
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }
        } catch (e) {
            toast.error("Error al crear el especialista." + e);
        }
    };

    const handleDescartarCambiosCrearEspecialista = () => {
        const clavesAComparar = Object.keys(especialistaCrear).filter(
            key => key !== "id" && key !== "servicio"
        ) as (keyof InitialEspecialistaProps)[];

        const sonIguales = clavesAComparar.every(
            key => especialistaCrear[key] === INITIAL_ESPECIALISTA_CREAR[key]
        );

        if (sonIguales) {
            handleClickDesactivarModal();
        } else {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de descartar los cambios?",
                textoAccion: "Descartar",
                onConfirmar: () => {
                    handleClickDesactivarModal();
                    setEspecialistaCrear(INITIAL_ESPECIALISTA);
                },
            });
        }
    };



    async function editarEspecialista({ id, camposCambiados }: { id: UUID, camposCambiados: Partial<EspecialistaEditarProps> }) {
        try {
            const { success, message, especialista } = await updateEspecialista(id, camposCambiados);
            console.log(camposCambiados)

            if (!success) throw new Error(message);

            if ("servicio" in camposCambiados) {

                const servicioAnterior = servicios.find(servicio => servicio.id === especialista.id_servicio);
                if (!servicioAnterior) throw new Error("Servicio anterior no encontrado");
                refrescarServiciosDisponiblesEliminar(especialista.id_servicio);
            }

            refrescarEspecialistasEditar(id, especialista);
            toast.success(message);
            handleClickDesactivarModal();
        } catch (e) {
            toast.error("Error al actualizar el especialista " + e);
        }
    }

    async function eliminarEspecialista(especialista: EspecialistaProps) {
        try {
            const { success, message } = await deleteEspecialista(especialista.id);
            if (success) {
                toast.success(message);
                refrescarEspecialistasEliminar(especialista.id);
                const servicioEliminado = servicios.find(servicio => servicio.titulo === especialista.servicio);
                if (servicioEliminado) {
                    refrescarServiciosDisponiblesAñadir(servicioEliminado);
                }
            } else {
                toast.error(message);
            }
        } catch {
            toast.error("Error al eliminar el especialista.");
        }
    }

    return {
        handleOpen,
        handleChange,
        handleChangeCrearEspecialista,
        handleEditarEspecialista,
        handleDelete,
        handleCrearEspecialista,
        especialistaSeleccionado,
        handleDescartarCambiosEditarEspecialista,
        handleDescartarCambiosCrearEspecialista,
    };
}
