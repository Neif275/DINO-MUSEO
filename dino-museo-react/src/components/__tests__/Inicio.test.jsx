import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Inicio from "../Inicio";
import { describe, expect, it } from "vitest";

describe('Componente Inicio', () => {
    it('Muestra el titulo y el boton que lleva a contacto', () => {
        render(<MemoryRouter><Inicio/></MemoryRouter>);

        expect(screen.getByText('Reino de Gigantes')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Reservar Entradas' })).toHaveAttribute('href', '/contacto');
    });

    it('Incluye el video del recorrido virtual', () => {
        render(<MemoryRouter><Inicio/></MemoryRouter>);

        expect(screen.getByTitle('Sala principal del museo')).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
    });
});