import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-router-dom", async (importOriginal) => {
    const original = await importOriginal();
    return { ...original,useLocation: vi.fn()};
});

describe('Componente NavBar con useLocation simulado', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('En el panel principal solo muestra volver al sitio', () => {
        useLocation.mockReturnValue({ pathname: '/admin' });
        render(<MemoryRouter><NavBar/></MemoryRouter>);

        expect(useLocation).toHaveBeenCalled();
        expect(screen.getByText('Volver al sitio')).toBeInTheDocument();
        expect(screen.queryByText('Panel de Administración')).not.toBeInTheDocument();
    });

    it('En el login muestra el menu del sitio publico', () => {
        useLocation.mockReturnValue({ pathname: '/admin/login' });
        render(<MemoryRouter><NavBar/></MemoryRouter>);

        expect(screen.getByText('Exposición')).toBeInTheDocument();
        expect(screen.queryByText('Volver al sitio')).not.toBeInTheDocument();
    });
});