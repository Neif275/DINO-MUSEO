import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Horarios from "../Horarios";
import { describe, expect, it } from "vitest";

describe('Componente Horarios', () => {
    it('Muestra la tabla de tarifas', () => {
        render(<MemoryRouter><Horarios/></MemoryRouter>);

        expect(screen.getByText('$10.000')).toBeInTheDocument();
        expect(screen.getByText('$5.000')).toBeInTheDocument();
        expect(screen.getByText('Gratis')).toBeInTheDocument();
    });

    it('Muestra una fila por cada tarifa mas el encabezado', () => {
        render(<MemoryRouter><Horarios/></MemoryRouter>);

        expect(screen.getAllByRole('row')).toHaveLength(4);
    });

    it('El boton de reservar lleva a contacto', () => {
        render(<MemoryRouter><Horarios/></MemoryRouter>);

        expect(screen.getByRole('link', { name: 'Reservar Entradas Online' })).toHaveAttribute('href', '/contacto');
    });
});