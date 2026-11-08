import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";
import { describe, expect, it } from "vitest";


describe('Componentes NavBar', () =>{
    it('Muestra los links del sitio publico', () => {
        render(<MemoryRouter><NavBar/></MemoryRouter>);

        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Exposición')).toBeInTheDocument();
        expect(screen.getByText('Horarios y Precios')).toBeInTheDocument();
        expect(screen.getByText('Contacto y Reservas')).toBeInTheDocument();
    });

    it('Marca como activo el link de la pagina actual', () => {
        render(<MemoryRouter initialEntries={['/horarios']}><NavBar/></MemoryRouter>);

        expect(screen.getByText('Horarios y Precios')).toHaveClass('active');
        expect(screen.getByText('Inicio')).not.toHaveClass('active');
    });

    it('Muestra el menu del panel en las paginas de admin', () => {
        render(<MemoryRouter initialEntries={['/admin/editar/trex']}><NavBar/></MemoryRouter>);

        expect(screen.getByText('Panel de Administración')).toBeInTheDocument();
        expect(screen.getByText('Volver al sitio')).toBeInTheDocument();
        expect(screen.queryByText('Exposición')).not.toBeInTheDocument();
    });
});