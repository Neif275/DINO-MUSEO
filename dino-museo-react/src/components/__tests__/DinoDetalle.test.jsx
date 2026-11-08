import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DinoDetalle from "../DinoDetalle";
import { beforeEach, describe, expect, it } from "vitest";

// renderiza el componente como si el usuario entrara a la url
const renderEnRuta = (url) => render(
    <MemoryRouter initialEntries={[url]}>
        <Routes>
            <Route path="/exposicion/:id" element={<DinoDetalle />} />
        </Routes>
    </MemoryRouter>
);

describe('Componente DinoDetalle', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('Muestra la ficha del dinosaurio que viene en la URL', () => {
        renderEnRuta('/exposicion/triceratops');

        expect(screen.getByRole('heading', { name: 'Triceratops' })).toBeInTheDocument();
        expect(screen.getByText('Ceratopsidae')).toBeInTheDocument();
    });

    it('Muestra mensaje si el dinosaurio no existe', () => {
        renderEnRuta('/exposicion/pikachu');

        expect(screen.getByText('Dinosaurio no encontrado')).toBeInTheDocument();
    });
});
