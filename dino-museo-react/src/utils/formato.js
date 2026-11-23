// $10.000 o "Gratis"
export function formatearPrecio(valor) {
    return valor === 0 ? 'Gratis' : '$' + valor.toLocaleString('es-CL');
}

// "2026-12-01" -> "01-12-2026"   |   "2026-11-22T16:49:02" -> "22-11-2026 16:49"
export function formatearFecha(texto) {
    if (!texto) return '';
    const [fecha, hora] = texto.split('T');
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}-${mes}-${anio}` + (hora ? ' ' + hora.slice(0, 5) : '');
}

// Fecha de hoy en formato yyyy-mm-dd (para el minimo del calendario)
export function hoy() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
}
