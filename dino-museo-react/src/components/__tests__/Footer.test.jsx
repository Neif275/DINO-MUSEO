import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";
import { describe, expect, it } from "vitest";

describe('Componente Footer', () => {
    it('Muestra el link al panel en el sitio publico', () => {
        render(<MemoryRouter initialEntries={['/']}><Footer/></MemoryRouter>);

        expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Panel administrativo' })).toHaveAttribute('href', '/admin/login');
    });

    it('Oculta el link al panel dentro del panel', () => {
        render(<MemoryRouter initialEntries={['/admin']}><Footer/></MemoryRouter>);

        expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
        expect(screen.queryByText('Panel administrativo')).not.toBeInTheDocument();
    });
});