import { useState } from "react";
import { ObtenerFechaActualMasUno } from "@/constants/Citas";
import type { UseTiempoProps } from "@/types/Components/types";


export function useTiempo({ handleChangeCrearCita }: UseTiempoProps) {

    const minDate = ObtenerFechaActualMasUno();
    const [fecha, setFecha] = useState<string>(minDate || "");
    const [hora, setHora] = useState<string>("");

    // Manejo del cambio de fecha
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFecha(e.target.value);
        setHora("");
        handleChangeCrearCita(e);
    };

    const handleResetearHora = () => {
        setHora("");
    }

    // Manejo del cambio de hora
    const handleTimeChange = (e: | React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { value: string; name: string } }) => {
        setHora(e.target.value);
        handleChangeCrearCita(
            e as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        );
    };

    return {
        hora,
        fecha,
        handleDateChange,
        handleTimeChange,
        minDate,
        handleResetearHora
    };
}
