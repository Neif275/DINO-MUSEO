import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch, borrarSesion, guardarSesion, leerSesion } from "../services/api";

// Guarda el estado de la sesion y lo comparte con toda la aplicacion
function AuthProvider({ children })
{
    // al recargar la pagina, la sesion se recupera desde localStorage
    const [sesion, setSesion] = useState(() => leerSesion());
    const [verificando, setVerificando] = useState(() => leerSesion() !== null);

    // y se confirma con el backend que el token sigue siendo valido
    useEffect(() => {
        if (!leerSesion()) return;
        apiFetch('/auth/perfil')
            .then((usuario) => {
                const actual = leerSesion();
                if (actual) {
                    const confirmada = { ...actual, usuario };
                    guardarSesion(confirmada);
                    setSesion(confirmada);
                }
            })
            .catch(() => {
                borrarSesion();
                setSesion(null);
            })
            .finally(() => setVerificando(false));
    }, []);

    // si el refresh token tambien vencio, api.js avisa y se cierra la sesion
    useEffect(() => {
        const expirar = () => setSesion(null);
        window.addEventListener('sesion-expirada', expirar);
        return () => window.removeEventListener('sesion-expirada', expirar);
    }, []);

    const iniciar = (datos) => {
        guardarSesion(datos);
        setSesion(datos);
        return datos.usuario;
    };

    const login = async (correo, password) => {
        borrarSesion();
        const datos = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ correo, password }),
        });
        return iniciar(datos);
    };

    const registrar = async (nombre, correo, password) => {
        borrarSesion();
        const datos = await apiFetch('/auth/registro', {
            method: 'POST',
            body: JSON.stringify({ nombre, correo, password }),
        });
        return iniciar(datos);
    };

    const logout = () => {
        borrarSesion();
        setSesion(null);
    };

    const tieneRol = (...roles) => sesion !== null && roles.includes(sesion.usuario.rol);

    return(
        <AuthContext.Provider value={{ usuario: sesion ? sesion.usuario : null, verificando, login, registrar, logout, tieneRol }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;
