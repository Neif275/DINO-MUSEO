import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactTable from "../ContactTable";
import { describe, expect, it } from "vitest";

describe('Componente ContactTable', () =>{
    it('Muestra los 4 contactos con su boton Ver', ()=>{
        render(<MemoryRouter><ContactTable/></MemoryRouter>);

        expect(screen.getByText('Daniela Beltrán')).toBeInTheDocument();
        expect(screen.getAllByRole('link',{name:'Ver'})).toHaveLength(4);
        expect(screen.getAllByRole('link',{name:'Ver'})[0]).toHaveAttribute('href', '/admin/contacto?contacto=1');
    }
    );
}
);
