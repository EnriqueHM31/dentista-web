import { useEspecialistasContext } from "@/context/Especialistas";
import { useServicioContext } from "@/context/Servicio";
import { createEspecialista, deleteEspecialista, updateEspecialista } from "@/services/Especialistas";
import type { EspecialistaProps, FormCrearEspecialistaProps, InitialEspecialistaProps } from "@/types/Especialistas/types";
import { esURLValida } from "@/utils/constantes";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { INITIAL_ESPECIALISTA, INITIAL_ESPECIALISTA_CREAR } from "@/constants/Especialistas";
import type { PropsHookEspecialistas } from "@/types/Especialistas/types";
import { mostrarToastConfirmacion } from "@/components/General/ToastConfirmacion";

export function useEspecialistas({ toggle, handleClickDesactivarModal }: PropsHookEspecialistas) {
    const { setEspecialistas, ordenarEspecialistas } = useEspecialistasContext();
    const { serviciosDisponibles, setServiciosDisponibles, servicios } = useServicioContext();

    const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<EspecialistaProps | null>(null);
    const [especialistaCrear, setEspecialistaCrear] = useState<FormCrearEspecialistaProps>(INITIAL_ESPECIALISTA);

    const especialistaRef = useRef<Omit<EspecialistaProps, "id">>(INITIAL_ESPECIALISTA);

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

    const handleEditarEspecialista = async (e: React.FormEvent, id: `${string}-${string}-${string}-${string}-${string}`) => {
        e.preventDefault();

        const camposCambiados: Partial<FormCrearEspecialistaProps> = {};
        (Object.keys(especialistaRef.current) as (keyof FormCrearEspecialistaProps)[]).forEach((key) => {
            if (especialistaRef.current[key] !== especialistaSeleccionado?.[key]) {
                camposCambiados[key] = especialistaSeleccionado?.[key];
            }
        });



        if (Object.keys(camposCambiados).length === 0) {
            toast.info("No hay cambios para guardar.");
            return;
        }

        if (Object.keys(camposCambiados).includes("servicio")) {
            const servicioDisponible = servicios.find(servicio => servicio.titulo === camposCambiados.servicio);
            if (!servicioDisponible) {
                toast.error("El servicio no está disponible");
                return;
            }
            camposCambiados.servicio = servicioDisponible.id;
        }

        if (Object.keys(camposCambiados).includes("avatar")) {
            if (!esURLValida(camposCambiados.avatar)) {
                toast.error("La URL de la imagen no es válida");
                return;
            }
        }

        if (Object.keys(camposCambiados).includes("linkedin")) {
            if (!esURLValida(camposCambiados.linkedin)) {
                toast.error("La URL de LinkedIn no es válida");
                return;
            }
        }


        try {
            mostrarToastConfirmacion({
                mensaje: "¿Estás seguro de guardar los cambios?",
                textoAccion: "Guardar",
                onConfirmar: async () => {
                    const { success, message, cambios } = await updateEspecialista(id, camposCambiados);
                    if (success) {
                        toast.success(message);
                        if ("servicio" in cambios) {
                            // 1. Devolver el servicio anterior a la lista de disponibles
                            const servicioAnterior = servicios.find(
                                servicio => servicio.titulo === especialistaSeleccionado?.servicio
                            );

                            if (servicioAnterior) {
                                setServiciosDisponibles(prev => {
                                    const yaExiste = prev.some(s => s.id === servicioAnterior.id);
                                    return yaExiste ? prev : [...prev, servicioAnterior];
                                });
                            }

                            // 2. Obtener el nuevo servicio (por ID) y poner su título en el especialista
                            const nuevoServicio = servicios.find(
                                servicio => servicio.id === cambios.servicio
                            );

                            if (nuevoServicio) {
                                cambios.servicio = nuevoServicio.titulo;
                            }
                        }

                        // 3. Actualizar al especialista con los nuevos datos
                        setEspecialistas(prev =>
                            ordenarEspecialistas(
                                prev.map(esp =>
                                    esp.id === id ? { ...esp, ...cambios } : esp
                                )
                            )
                        );

                        handleClickDesactivarModal();
                    } else {
                        toast.error(message);
                    }
                },
            });
        } catch {
            toast.error("Error al actualizar el especialista.");
        }
    };

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
            onConfirmar: async () => {
                const { success, message } = await deleteEspecialista(especialista.id as `${string}-${string}-${string}-${string}-${string}`);
                if (success) {
                    toast.success(message);
                    setEspecialistas(prev => prev.filter((esp) => esp.id !== especialista.id));
                    const servicioEliminado = servicios.find(servicio => servicio.titulo === especialista.servicio);
                    if (servicioEliminado) {
                        setServiciosDisponibles(prev => [...prev, servicioEliminado]);
                    }
                } else {
                    toast.error(message);
                }
            },
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
                setEspecialistas(prev => ordenarEspecialistas([...prev, especialistaCreado]));
                setServiciosDisponibles(serviciosDisponibles.filter(servicio => servicio.id !== servicioDisponible.id));
                handleClickDesactivarModal();
            } else {
                toast.error(message);
            }
        } catch {
            toast.error("Error al crear el especialista.");
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
