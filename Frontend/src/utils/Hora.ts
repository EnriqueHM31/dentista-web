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
