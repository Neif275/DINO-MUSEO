import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../LoginForm";
import { describe, expect, it } from "vitest";

describe('Componente LoginForm', () => {
    it('Muestra los errores al enviar formulario vacío', () => {
        render(<MemoryRouter><LoginForm /></MemoryRouter>);

        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

        expect(screen.getAllByText('Dato obligatorio')).toHaveLength(2);
    });

    it('Muestra el mensaje de exito con datos validos', () => {
        render(<MemoryRouter><LoginForm /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'admin@dinomuseo.cl' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

        expect(screen.getByText('Inicio de sesión exitoso!')).toBeInTheDocument();
    });
});
