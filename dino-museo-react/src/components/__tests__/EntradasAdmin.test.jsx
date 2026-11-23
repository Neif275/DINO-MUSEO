import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EntradasAdmin from "../EntradasAdmin";
import { AuthContext } from "../../context/AuthContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos) => ({ ok: true, status: 200, json: async () => datos });

const PRODUCTOS = [
    { id: 1, nombre: 'General', precio: 10000, cupos: 200, activo: true, categoria: { id: 1, nombre: 'Entrada individual' } },
];

const renderConRol = (rol) => render(
    <AuthContext.Provider value={{ usuario: { nombre: 'Prueba', rol }, tieneRol: (...roles) => roles.includes(rol) }}>
        <MemoryRouter><EntradasAdmin/></MemoryRouter>
    </AuthContext.Provider>
);

describe('Componente EntradasAdmin', () => {
    beforeEach(() => vi.stubGlobal('fetch', vi.fn(async () => respuesta(PRODUCTOS))));
    afterEach(() => vi.unstubAllGlobals());

    it('El vendedor solo puede ver las entradas', async () => {
        renderConRol('VENDEDOR');

        expect(await screen.findByText('General')).toBeInTheDocument();
        expect(screen.getByText('Ver')).toBeInTheDocument();
        expect(screen.queryByText('Editar')).not.toBeInTheDocument();
        expect(screen.queryByText('Eliminar')).not.toBeInTheDocument();
        expect(screen.queryByText('Nueva entrada')).not.toBeInTheDocument();
    });

    it('El administrador puede crear, editar y eliminar', async () => {
        renderConRol('ADMIN');

        expect(await screen.findByText('General')).toBeInTheDocument();
        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
        expect(screen.getByText('Nueva entrada')).toBeInTheDocument();
    });
});
