import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactDetail from "../ContactDetail";
import { describe, expect, it } from "vitest";

describe('Componente ContactDetail', () =>{
    it('Muestra el contacto que viene en la URL', ()=>{
        render(<MemoryRouter initialEntries={['/admin/contacto?contacto=3']}><ContactDetail/></MemoryRouter>);

        expect(screen.getByText('Contacto de Diego Reyes')).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo/i).value).toBe('diego@email.com');
    }
    );

    it('Muestra mensaje si el contacto no existe', ()=>{
        render(<MemoryRouter initialEntries={['/admin/contacto?contacto=99']}><ContactDetail/></MemoryRouter>);

        expect(screen.getByText('Contacto no encontrado')).toBeInTheDocument();
    }
    );
}
);
