import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RegistroForm from "../RegistroForm";
import SinAcceso from "../SinAcceso";
import AuthProvider from "../../context/AuthProvider";
import { AuthContext } from "../../context/AuthContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const renderRegistro = () => render(
    <MemoryRouter initialEntries={['/registro']}>
        <AuthProvider>
            <Routes>
                <Route path="/registro" element={<RegistroForm/>}/>
                <Route path="/tienda" element={<p>Pantalla tienda</p>}/>
            </Routes>
        </AuthProvider>
    </MemoryRouter>
);

const llenar = (nombre, correo, password) => {
    fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: nombre } });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: correo } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
};

describe('Componente RegistroForm', () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => vi.unstubAllGlobals());

    it('Valida los campos antes de enviar', () => {
        renderRegistro();

        llenar('', 'correo-malo', '123');

        expect(screen.getByText('Dato obligatorio')).toBeInTheDocument();
        expect(screen.getByText('Correo no válido')).toBeInTheDocument();
        expect(screen.getByText('Mínimo 6 caracteres')).toBeInTheDocument();
    });

    it('Crea la cuenta y lleva a la tienda', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({
            token: 't', refreshToken: 'r', usuario: { nombre: 'Ana', correo: 'ana@correo.cl', rol: 'CLIENTE' },
        }, 201)));
        renderRegistro();

        llenar('Ana', 'ana@correo.cl', 'secreto1');

        expect(await screen.findByText('Pantalla tienda')).toBeInTheDocument();
    });

    it('Muestra el error del backend si el correo ya existe', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({ mensaje: 'Ya existe una cuenta con el correo ana@correo.cl' }, 409)));
        renderRegistro();

        llenar('Ana', 'ana@correo.cl', 'secreto1');

        expect(await screen.findByText('Ya existe una cuenta con el correo ana@correo.cl')).toBeInTheDocument();
    });
});

describe('Componente SinAcceso', () => {
    it('El cliente vuelve a la tienda y el vendedor al panel', () => {
        const { unmount } = render(
            <AuthContext.Provider value={{ usuario: { rol: 'CLIENTE' } }}><MemoryRouter><SinAcceso/></MemoryRouter></AuthContext.Provider>
        );
        expect(screen.getByRole('link', { name: 'Volver' })).toHaveAttribute('href', '/tienda');
        unmount();

        render(
            <AuthContext.Provider value={{ usuario: { rol: 'VENDEDOR' } }}><MemoryRouter><SinAcceso/></MemoryRouter></AuthContext.Provider>
        );
        expect(screen.getByRole('link', { name: 'Volver' })).toHaveAttribute('href', '/admin');
    });
});
