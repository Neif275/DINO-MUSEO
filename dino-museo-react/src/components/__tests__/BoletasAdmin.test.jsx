import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BoletasAdmin from "../BoletasAdmin";
import { AuthContext } from "../../context/AuthContext";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos) => ({ ok: true, status: 200, json: async () => datos });

const BOLETAS = [
    { id: 1, fecha: '2026-11-22T16:49:02', fechaVisita: '2026-11-25', total: 25000,
      usuario: { nombre: 'Cliente de prueba' }, detalles: [] },
];

const renderConRol = (rol) => render(
    <AuthContext.Provider value={{ usuario: { nombre: 'Prueba', rol }, tieneRol: (...roles) => roles.includes(rol) }}>
        <MemoryRouter><BoletasAdmin/></MemoryRouter>
    </AuthContext.Provider>
);

describe('Componente BoletasAdmin', () => {
    beforeEach(() => vi.stubGlobal('fetch', vi.fn(async () => respuesta(BOLETAS))));
    afterEach(() => vi.unstubAllGlobals());

    it('Muestra las boletas con su cliente y total', async () => {
        renderConRol('VENDEDOR');

        expect(await screen.findByText('Cliente de prueba')).toBeInTheDocument();
        expect(screen.getByText('$25.000')).toBeInTheDocument();
        expect(screen.getByText('25-11-2026')).toBeInTheDocument();
    });

    it('Solo el administrador puede anular', async () => {
        renderConRol('VENDEDOR');
        await screen.findByText('Cliente de prueba');
        expect(screen.queryByText('Anular')).not.toBeInTheDocument();
    });
});
