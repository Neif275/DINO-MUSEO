import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../LoginForm";
import AuthProvider from "../../context/AuthProvider";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// respuesta falsa del backend para no depender de que este encendido
const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const renderLogin = () => render(
    <MemoryRouter><AuthProvider><LoginForm /></AuthProvider></MemoryRouter>
);

const llenar = (correo, password) => {
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: correo } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
};

describe('Componente LoginForm', () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => vi.unstubAllGlobals());

    it('Muestra los errores al enviar formulario vacío', () => {
        renderLogin();

        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

        expect(screen.getAllByText('Dato obligatorio')).toHaveLength(2);
    });

    it('Con datos correctos inicia sesion y guarda el token', async () => {
        const fetchFalso = vi.fn(async () => respuesta({
            token: 'token-de-prueba', refreshToken: 'refresh', expiraEnMs: 1800000,
            usuario: { id: 1, nombre: 'Administrador', correo: 'admin@dinomuseo.cl', rol: 'ADMIN' },
        }));
        vi.stubGlobal('fetch', fetchFalso);
        renderLogin();

        llenar('admin@dinomuseo.cl', 'Admin123!');

        expect(await screen.findByText('Inicio de sesión exitoso!')).toBeInTheDocument();
        expect(fetchFalso.mock.calls[0][0]).toContain('/auth/login');
        expect(JSON.parse(localStorage.getItem('dinomuseo_sesion')).token).toBe('token-de-prueba');
    });

    it('Muestra el mensaje del backend si la contraseña es incorrecta', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({ error: 401, mensaje: 'Correo o contraseña incorrectos' }, 401)));
        renderLogin();

        llenar('admin@dinomuseo.cl', 'otra');

        expect(await screen.findByText('Correo o contraseña incorrectos')).toBeInTheDocument();
        expect(localStorage.getItem('dinomuseo_sesion')).toBeNull();
    });
});
