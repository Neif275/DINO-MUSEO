import { render, screen, fireEvent } from "@testing-library/react";
import AuthProvider from "../../context/AuthProvider";
import { useAuth } from "../../context/AuthContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const SESION = {
    token: 'token-viejo',
    refreshToken: 'refresh-viejo',
    usuario: { id: 3, nombre: 'Cliente de prueba', correo: 'cliente@dinomuseo.cl', rol: 'CLIENTE' },
};

// componente de prueba que muestra lo que tiene la sesion
function MostrarSesion() {
    const { usuario, verificando, logout } = useAuth();
    if (verificando) return <p>verificando</p>;
    return usuario
        ? <button onClick={logout}>Salir de {usuario.nombre}</button>
        : <p>sin sesion</p>;
}

describe('Gestion de sesion (AuthProvider)', () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => vi.unstubAllGlobals());

    it('Al recargar la pagina recupera la sesion guardada y la confirma con el backend', async () => {
        localStorage.setItem('dinomuseo_sesion', JSON.stringify(SESION));
        const fetchFalso = vi.fn(async () => respuesta(SESION.usuario));
        vi.stubGlobal('fetch', fetchFalso);

        render(<AuthProvider><MostrarSesion/></AuthProvider>);

        expect(await screen.findByText('Salir de Cliente de prueba')).toBeInTheDocument();
        expect(fetchFalso.mock.calls[0][0]).toContain('/auth/perfil');
        expect(fetchFalso.mock.calls[0][1].headers.Authorization).toBe('Bearer token-viejo');
    });

    it('Si el token vencio usa el refresh token y guarda el token nuevo', async () => {
        localStorage.setItem('dinomuseo_sesion', JSON.stringify(SESION));
        vi.stubGlobal('fetch', vi.fn(async (url, opciones) => {
            if (url.endsWith('/auth/refresh')) return respuesta({ ...SESION, token: 'token-nuevo' });
            return opciones.headers.Authorization === 'Bearer token-nuevo'
                ? respuesta(SESION.usuario)
                : respuesta({ mensaje: 'vencido' }, 401);
        }));

        render(<AuthProvider><MostrarSesion/></AuthProvider>);

        expect(await screen.findByText('Salir de Cliente de prueba')).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('dinomuseo_sesion')).token).toBe('token-nuevo');
    });

    it('Si tambien vencio el refresh token cierra la sesion', async () => {
        localStorage.setItem('dinomuseo_sesion', JSON.stringify(SESION));
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({ mensaje: 'vencido' }, 401)));

        render(<AuthProvider><MostrarSesion/></AuthProvider>);

        expect(await screen.findByText('sin sesion')).toBeInTheDocument();
        expect(localStorage.getItem('dinomuseo_sesion')).toBeNull();
    });

    it('Cerrar sesion borra los datos guardados', async () => {
        localStorage.setItem('dinomuseo_sesion', JSON.stringify(SESION));
        vi.stubGlobal('fetch', vi.fn(async () => respuesta(SESION.usuario)));
        render(<AuthProvider><MostrarSesion/></AuthProvider>);

        fireEvent.click(await screen.findByText('Salir de Cliente de prueba'));

        expect(screen.getByText('sin sesion')).toBeInTheDocument();
        expect(localStorage.getItem('dinomuseo_sesion')).toBeNull();
    });
});
