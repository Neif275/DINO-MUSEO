import { render, screen, fireEvent } from "@testing-library/react";
import Tienda from "../Tienda";
import { afterEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const individual = { id: 1, nombre: 'Entrada individual' };
const PRODUCTOS = [
    { id: 1, nombre: 'General', descripcion: 'A partir de los 15 años', precio: 10000, cupos: 200, activo: true, categoria: individual },
    { id: 2, nombre: 'Niños', descripcion: 'Entre 3 y 14 años', precio: 5000, cupos: 200, activo: true, categoria: individual },
];

// backend falso: entrega las entradas, las compras del cliente y crea la boleta
const backendFalso = () => vi.fn(async (url, opciones) => {
    if (url.includes('/productos')) return respuesta(PRODUCTOS);
    if (url.includes('/mis-boletas')) return respuesta([]);
    if (url.endsWith('/boletas') && opciones.method === 'POST') {
        return respuesta({ id: 7, total: 25000, fechaVisita: '2026-12-01', detalles: [] }, 201);
    }
    return respuesta({}, 404);
});

describe('Componente Tienda', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('Muestra las entradas que vienen del backend', async () => {
        vi.stubGlobal('fetch', backendFalso());
        render(<Tienda/>);

        expect(await screen.findByText('General')).toBeInTheDocument();
        expect(screen.getByText('Entrada individual')).toBeInTheDocument();
        expect(screen.getByText('$10.000')).toBeInTheDocument();
    });

    it('Calcula el total y envia la compra al backend', async () => {
        const fetchFalso = backendFalso();
        vi.stubGlobal('fetch', fetchFalso);
        render(<Tienda/>);

        fireEvent.change(await screen.findByLabelText('Cantidad General'), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText('Cantidad Niños'), { target: { value: '1' } });
        expect(screen.getByText('$25.000')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Comprar entradas' }));

        expect(await screen.findByText(/Compra realizada! Boleta N° 7/)).toBeInTheDocument();
        const compra = fetchFalso.mock.calls.find(([url, op]) => url.endsWith('/boletas') && op.method === 'POST');
        expect(JSON.parse(compra[1].body).items).toEqual([
            { productoId: 1, cantidad: 2 },
            { productoId: 2, cantidad: 1 },
        ]);
    });

    it('Sin entradas elegidas no se puede comprar', async () => {
        vi.stubGlobal('fetch', backendFalso());
        render(<Tienda/>);

        expect(await screen.findByRole('button', { name: 'Comprar entradas' })).toBeDisabled();
    });
});
