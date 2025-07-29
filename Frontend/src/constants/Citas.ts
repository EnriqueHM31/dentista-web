import type { CitaFormProps } from "@/types/Citas/types";

export const ObtenerFechaActualMasUno = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`; // ✅ "yyyy-MM-dd"
};

export function formatearInputDateDesdeString(fechaStr: string): string {
    const [dia, mes, año] = fechaStr.split("/").map(Number);

    const day = String(dia).padStart(2, '0');
    const month = String(mes).padStart(2, '0');

    return `${año}-${month}-${day}`;
}

export const INITIAL_FORM_CITA: CitaFormProps = {
    nombre: "",
    email: "",
    telefono: "",
    fecha: ObtenerFechaActualMasUno(),
    servicio: "",
    hora: "",
    comentarios: "",
}