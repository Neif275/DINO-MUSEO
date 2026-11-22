import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";
import { AuthContext } from "../../context/AuthContext";
import { describe, expect, it } from "vitest";

const renderConUsuario = (usuario) => render(
    <AuthContext.Provider value={{ usuario, logout: () => {} }}>
        <MemoryRouter><NavBar/></MemoryRouter>
    </AuthContext.Provider>
);

describe('NavBar segun la sesion', () => {
    it('Sin sesion muestra el link Ingresar', () => {
        renderConUsuario(null);

        expect(screen.getByText('Ingresar')).toBeInTheDocument();
        expect(screen.queryByText(/Cerrar sesión/)).not.toBeInTheDocument();
    });

    it('Un cliente ve cerrar sesion pero no el panel', () => {
        renderConUsuario({ nombre: 'Ana', rol: 'CLIENTE' });

        expect(screen.getByText('Cerrar sesión (Ana)')).toBeInTheDocument();
        expect(screen.queryByText('Panel')).not.toBeInTheDocument();
    });

    it('Un vendedor ve el acceso al panel', () => {
        renderConUsuario({ nombre: 'Vendedor', rol: 'VENDEDOR' });

        expect(screen.getByText('Panel')).toBeInTheDocument();
    });
});
