import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EntradaDetalle from "../EntradaDetalle";
import BoletaDetalle from "../BoletaDetalle";
import { AuthContext } from "../../context/AuthContext";
import { afterEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const renderEn = (url, ruta, componente, rol = 'VENDEDOR') => render(
    <AuthContext.Provider value={{ usuario: { rol }, tieneRol: (...roles) => roles.includes(rol) }}>
        <MemoryRouter initialEntries={[url]}>
            <Routes><Route path={ruta} element={componente}/></Routes>
        </MemoryRouter>
    </AuthContext.Provider>
);

describe('Detalle de entrada y de boleta', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('Muestra el detalle de una entrada; el vendedor no ve Editar', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({
            id: 1, nombre: 'General', descripcion: 'A partir de los 15 años', precio: 10000, cupos: 198, activo: true,
            categoria: { id: 1, nombre: 'Entrada individual' },
        })));
        renderEn('/admin/entradas/1', '/admin/entradas/:id', <EntradaDetalle/>);

        expect(await screen.findByText('Entrada: General')).toBeInTheDocument();
        expect(screen.getByText('198')).toBeInTheDocument();
        expect(screen.queryByText('Editar')).not.toBeInTheDocument();
    });

    it('Muestra el detalle de una boleta con sus entradas', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({
            id: 4, fecha: '2026-11-22T16:49:02', fechaVisita: '2026-11-25', total: 25000,
            usuario: { nombre: 'Cliente de prueba', correo: 'cliente@dinomuseo.cl' },
            detalles: [{ id: 1, cantidad: 2, precioUnitario: 10000, subtotal: 20000, producto: { nombre: 'General' } }],
        })));
        renderEn('/admin/boletas/4', '/admin/boletas/:id', <BoletaDetalle/>);

        expect(await screen.findByText('Boleta N° 4')).toBeInTheDocument();
        expect(screen.getByText('General')).toBeInTheDocument();
        expect(screen.getByText('$20.000')).toBeInTheDocument();
        expect(screen.getByText('Total: $25.000')).toBeInTheDocument();
    });

    it('Si el backend responde error lo muestra', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => respuesta({ mensaje: 'No existe la boleta 99' }, 404)));
        renderEn('/admin/boletas/99', '/admin/boletas/:id', <BoletaDetalle/>);

        expect(await screen.findByText('No existe la boleta 99')).toBeInTheDocument();
    });
});
