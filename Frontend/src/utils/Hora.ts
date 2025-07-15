export const formatoHoraMinuto = (minutosArray: string[]) => {
    minutosArray.map((minStr) => {
        const minutosTotales = parseInt(minStr, 10);
        const horas = Math.floor(minutosTotales / 60);
        const minutos = minutosTotales % 60;

        return `${horas > 0 ? `${horas}h ` : ""}${minutos > 0 ? `${minutos}m` : ""}`.trim();
    });
    return minutosArray;
}

export function formatearDuracion(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    const partes = [];
    if (horas > 0) partes.push(`${horas}h`);
    if (minutosRestantes > 0) partes.push(`${minutosRestantes}m`);

    return partes.join(" ");
}
