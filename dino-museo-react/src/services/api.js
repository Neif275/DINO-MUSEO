// Comunicacion con el backend Spring Boot (API REST)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const CLAVE_SESION = 'dinomuseo_sesion';

// La sesion { token, refreshToken, usuario } se guarda en localStorage
// para que siga activa aunque se recargue la pagina
export function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_SESION));
    } catch {
        return null;
    }
}

export function guardarSesion(sesion) {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

export function borrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

// Pide un token nuevo con el refresh token. Si no se puede, cierra la sesion
async function renovarToken() {
    const sesion = leerSesion();
    if (!sesion?.refreshToken) return null;

    const respuesta = await fetch(API_URL + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: sesion.refreshToken }),
    });
    if (!respuesta.ok) {
        borrarSesion();
        return null;
    }
    const nueva = await respuesta.json();
    guardarSesion(nueva);
    return nueva;
}

// Todas las llamadas al backend pasan por aqui:
// agrega el token, convierte a JSON y entrega el mensaje de error del backend
export async function apiFetch(ruta, opciones = {}) {
    const sesion = leerSesion();
    const headers = { 'Content-Type': 'application/json', ...opciones.headers };
    if (sesion?.token) {
        headers.Authorization = 'Bearer ' + sesion.token;
    }

    let respuesta = await fetch(API_URL + ruta, { ...opciones, headers });

    // token vencido: se renueva una vez y se repite la peticion
    if (respuesta.status === 401 && sesion?.refreshToken) {
        const nueva = await renovarToken();
        if (nueva) {
            headers.Authorization = 'Bearer ' + nueva.token;
            respuesta = await fetch(API_URL + ruta, { ...opciones, headers });
        } else {
            window.dispatchEvent(new Event('sesion-expirada'));
        }
    }

    if (respuesta.status === 204) return null;
    const datos = await respuesta.json().catch(() => null);
    if (!respuesta.ok) {
        throw new Error(datos?.mensaje || 'Error ' + respuesta.status);
    }
    return datos;
}
