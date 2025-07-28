export const formatoHoraMinutoArray = (minutosArray: string[]) => {
    return minutosArray.map((minStr) => {
        const minutosTotales = parseInt(minStr, 10);
        const horas = Math.floor(minutosTotales / 60);
        const minutos = minutosTotales % 60;

        return `${horas > 0 ? `${horas}h ` : ""}${minutos > 0 ? `${minutos}m` : ""}`.trim();
    });
}

export const formatoHoraMinutoSingle = (minStr: string) => {
    const minutosTotales = parseInt(minStr, 10);
    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;

    return `${horas > 0 ? `${horas}h ` : ""}${minutos > 0 ? `${minutos}m` : ""}`.trim();
};

export function convertirADuracionEnMinutos(valor: string) {
    if (typeof valor !== "string") return valor;
    const horasMatch = valor.match(/(\d+)\s*h/);
    const minutosMatch = valor.match(/(\d+)\s*m/);

    const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;

    const totalMinutos = horas * 60 + minutos;

    return totalMinutos; // Retorna número entero: 30, 60, 90, 120...
}

export function formatearHora(hora: string): string {
    const [horas, minutos] = hora.split(":");
    // Asegura dos dígitos (por si alguna vez llega sin)
    const h = horas.padStart(2, "0");
    const m = minutos.padStart(2, "0");
    return `${h}:${m}`;
}

export function formatearFechaConMes(fechaStr: string): string {
    const [dia, mes, año] = fechaStr.split("/").map(Number);
    const fecha = new Date(año, mes - 1, dia);
    const opciones: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
}


export function verificacionFechaHora({ hora, fecha }: { hora: string, fecha: string }) {
    const [horaStr, minutosStr] = hora.split(":");
    const fechaHoraCita = new Date(fecha);
    fechaHoraCita.setHours(parseInt(horaStr));
    fechaHoraCita.setMinutes(parseInt(minutosStr));
    fechaHoraCita.setSeconds(0);
    fechaHoraCita.setMilliseconds(0);

    return fechaHoraCita;
}