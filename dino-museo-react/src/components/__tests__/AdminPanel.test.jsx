import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPanel from "../AdminPanel";
import { AuthContext } from "../../context/AuthContext";
import { describe, expect, it, vi } from "vitest";

// el grafico usa canvas, que no existe en las pruebas
vi.mock("../ChartSection", () => ({ default: () => <p>Grafico</p> }));

const renderConRol = (rol) => render(
    <AuthContext.Provider value={{ usuario: { nombre: 'Prueba', rol }, tieneRol: (...roles) => roles.includes(rol) }}>
        <MemoryRouter><AdminPanel/></MemoryRouter>
    </AuthContext.Provider>
);

describe('Componente AdminPanel segun el rol', () => {
    it('El vendedor solo ve entradas y boletas', () => {
        renderConRol('VENDEDOR');

        expect(screen.getByText('Ver entradas')).toBeInTheDocument();
        expect(screen.getByText('Ver boletas')).toBeInTheDocument();
        expect(screen.queryByText('Resumen del museo')).not.toBeInTheDocument();
        expect(screen.queryByText('Gestión de especies')).not.toBeInTheDocument();
    });

    it('El administrador ve todas las secciones', () => {
        renderConRol('ADMIN');

        expect(screen.getByText('Ver entradas')).toBeInTheDocument();
        expect(screen.getByText('Resumen del museo')).toBeInTheDocument();
        expect(screen.getByText('Gestión de especies')).toBeInTheDocument();
    });
});
