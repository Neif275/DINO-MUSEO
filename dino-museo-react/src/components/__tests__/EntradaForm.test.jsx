import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EntradaForm from "../EntradaForm";
import { afterEach, describe, expect, it, vi } from "vitest";

const respuesta = (datos, status = 200) => ({ ok: status < 400, status, json: async () => datos });

const CATEGORIAS = [{ id: 1, nombre: 'Entrada individual' }, { id: 2, nombre: 'Visita guiada' }];
const GENERAL = { id: 1, nombre: 'General', descripcion: 'A partir de los 15 años', precio: 10000, cupos: 200, activo: true, categoria: CATEGORIAS[0] };

const backendFalso = () => vi.fn(async (url) => {
    if (url.endsWith('/categorias')) return respuesta(CATEGORIAS);
    if (url.endsWith('/productos/1')) return respuesta(GENERAL);
    return respuesta({ id: 9 }, 201);
});

const renderEn = (url) => render(
    <MemoryRouter initialEntries={[url]}>
        <Routes>
            <Route path="/admin/entradas/nueva" element={<EntradaForm/>}/>
            <Route path="/admin/entradas/:id/editar" element={<EntradaForm/>}/>
            <Route path="/admin/entradas" element={<p>Lista de entradas</p>}/>
        </Routes>
    </MemoryRouter>
);

describe('Componente EntradaForm', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('Valida los datos de una entrada nueva', async () => {
        vi.stubGlobal('fetch', backendFalso());
        renderEn('/admin/entradas/nueva');
        await screen.findByText('Visita guiada');

        fireEvent.change(screen.getByLabelText('Precio (0 = gratis)'), { target: { value: '-5' } });
        fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

        expect(screen.getByText('Dato obligatorio')).toBeInTheDocument();
        expect(screen.getByText('Elige una categoría')).toBeInTheDocument();
        expect(screen.getAllByText('Debe ser un número entero mayor o igual a 0')).toHaveLength(2);
    });

    it('Crea una entrada con POST y vuelve a la lista', async () => {
        const fetchFalso = backendFalso();
        vi.stubGlobal('fetch', fetchFalso);
        renderEn('/admin/entradas/nueva');
        await screen.findByText('Visita guiada');

        fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Noche en el museo' } });
        fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText('Precio (0 = gratis)'), { target: { value: '15000' } });
        fireEvent.change(screen.getByLabelText('Cupos disponibles'), { target: { value: '30' } });
        fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

        expect(await screen.findByText('Lista de entradas')).toBeInTheDocument();
        const [, opciones] = fetchFalso.mock.calls.find(([, op]) => op.method === 'POST');
        expect(JSON.parse(opciones.body)).toMatchObject({ nombre: 'Noche en el museo', precio: 15000, cupos: 30, categoria: { id: 2 } });
    });

    it('Al editar carga los datos y guarda con PUT', async () => {
        const fetchFalso = backendFalso();
        vi.stubGlobal('fetch', fetchFalso);
        renderEn('/admin/entradas/1/editar');

        expect(await screen.findByDisplayValue('General')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

        expect(await screen.findByText('Lista de entradas')).toBeInTheDocument();
        expect(fetchFalso.mock.calls.some(([url, op]) => url.endsWith('/productos/1') && op.method === 'PUT')).toBe(true);
    });
});
