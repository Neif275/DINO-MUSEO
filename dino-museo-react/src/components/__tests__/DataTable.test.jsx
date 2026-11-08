import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DataTable from "../DataTable";
import { beforeEach, describe, expect, it } from "vitest";

describe('Componente DataTable', () =>{
    beforeEach(() => {
        localStorage.clear();
    });

    it('Muestra 12 especies activas y 1 inactiva', ()=>{
        render(<MemoryRouter><DataTable/></MemoryRouter>);

        expect(screen.getAllByText('Activo')).toHaveLength(12);
        expect(screen.getAllByText('Inactivo')).toHaveLength(1);
        expect(screen.getByRole('button',{name:/Exportar/i})).toBeInTheDocument();
    }
    );

    it('Usa el estado guardado en localStorage', ()=>{
        localStorage.setItem('trex', 'inactivo');
        render(<MemoryRouter><DataTable/></MemoryRouter>);

        expect(screen.getAllByText('Inactivo')).toHaveLength(2);
    }
    );
}
);
