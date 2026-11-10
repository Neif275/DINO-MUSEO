import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Inicio from "../Inicio";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

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

    it('Oculta y vuelve a mostrar el video al presionar el boton', async () => {
        const user = userEvent.setup();
        render(<MemoryRouter><Inicio/></MemoryRouter>);

        await user.click(screen.getByRole('button', { name: 'Ocultar recorrido' }));
        expect(screen.queryByTitle('Sala principal del museo')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Mostrar recorrido' }));
        expect(screen.getByTitle('Sala principal del museo')).toBeInTheDocument();
    });
});