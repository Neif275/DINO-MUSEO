import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RutaProtegida from "../RutaProtegida";
import { AuthContext } from "../../context/AuthContext";
import { describe, expect, it } from "vitest";

// Simula la sesion con un usuario del rol indicado (o sin sesion) y abre /admin
const renderConRol = (rol) => render(
    <AuthContext.Provider value={{ usuario: rol ? { nombre: 'Prueba', rol } : null, verificando: false }}>
        <MemoryRouter initialEntries={['/admin']}>
            <Routes>
                <Route path="/admin" element={<RutaProtegida roles={['ADMIN', 'VENDEDOR']}><p>Panel privado</p></RutaProtegida>}/>
                <Route path="/admin/login" element={<p>Pantalla de login</p>}/>
                <Route path="/sin-acceso" element={<p>Pantalla sin acceso</p>}/>
            </Routes>
        </MemoryRouter>
    </AuthContext.Provider>
);

describe('Componente RutaProtegida', () => {
    it('Sin sesion manda al login', () => {
        renderConRol(null);

        expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
        expect(screen.queryByText('Panel privado')).not.toBeInTheDocument();
    });

    it('Un cliente no puede entrar al panel', () => {
        renderConRol('CLIENTE');

        expect(screen.getByText('Pantalla sin acceso')).toBeInTheDocument();
    });

    it('El vendedor y el administrador si pueden entrar', () => {
        renderConRol('VENDEDOR');
        expect(screen.getByText('Panel privado')).toBeInTheDocument();
    });
});
