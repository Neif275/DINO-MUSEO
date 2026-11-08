import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../ContactForm";
import { describe, expect, it } from "vitest";

describe('Componente ContactForm', () => {
    it('Debe limpiar los campos despues del submit', () => {
        render(<ContactForm />);
        const nombres = screen.getByLabelText(/Nombres/i);
        const apellidos = screen.getByLabelText(/Apellidos/i);
        const correo = screen.getByLabelText(/Correo/i);
        const mensaje = screen.getByLabelText(/Detalles/i);
        const boton = screen.getByRole('button', { name: /Enviar/i });

        fireEvent.change(nombres, { target: { value: 'Juan' } });
        fireEvent.change(apellidos, { target: { value: 'Perez' } });
        fireEvent.change(correo, { target: { value: 'juan@mail.com' } });
        fireEvent.change(mensaje, { target: { value: 'Hola' } });
        fireEvent.click(boton);

        expect(screen.getByText(/Formulario enviado correctamente/i)).toBeInTheDocument();
        expect(nombres.value).toBe('');
        expect(apellidos.value).toBe('');
        expect(correo.value).toBe('');
        expect(mensaje.value).toBe('');
    });

    it('Muestra los errores al enviar formulario vacío', () => {
        render(<ContactForm />);
        const boton = screen.getByRole('button', { name: /Enviar/i });

        fireEvent.click(boton);

        expect(screen.getAllByText('Dato obligatorio')).toHaveLength(4);
    });

    it('Muestra error si el correo no tiene formato valido', () => {
        render(<ContactForm />);
        const correo = screen.getByLabelText(/Correo/i);

        fireEvent.change(correo, { target: { value: 'juan-mail' } });
        fireEvent.blur(correo);

        expect(screen.getByText('Correo no válido')).toBeInTheDocument();
    });
});
