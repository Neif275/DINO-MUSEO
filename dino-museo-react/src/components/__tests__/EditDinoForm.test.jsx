import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditDinoForm from "../EditDinoForm";
import { beforeEach, describe, expect, it } from "vitest";

const renderEditar = (id) => render(
    <MemoryRouter initialEntries={['/admin/editar/' + id]}>
        <Routes>
            <Route path="/admin/editar/:id" element={<EditDinoForm/>}/>
        </Routes>
    </MemoryRouter>
);

describe('Componente EditDinoForm', () =>{
    beforeEach(() => {
        localStorage.clear();
    });

    it('Carga los datos del dinosaurio en el formulario', ()=>{
        renderEditar('trex');

        expect(screen.getByLabelText(/^Nombre/i).value).toBe('Tyrannosaurus Rex');
        expect(screen.getByLabelText(/Familia/i).value).toBe('Tyrannosauridae');
    }
    );

    it('Muestra error si se borra un campo y se guarda', ()=>{
        renderEditar('trex');

        fireEvent.change(screen.getByLabelText(/^Nombre/i),{target:{value:''}});
        fireEvent.click(screen.getByRole('button',{name:/Guardar cambios/i}));

        expect(screen.getByText('Dato obligatorio')).toBeInTheDocument();
        expect(screen.queryByText('Cambios guardados correctamente')).not.toBeInTheDocument();
    }
    );

    it('Desactiva la especie y lo guarda en localStorage', ()=>{
        renderEditar('trex');

        fireEvent.click(screen.getByRole('button',{name:/Desactivar especie/i}));

        expect(localStorage.getItem('trex')).toBe('inactivo');
        expect(screen.getByRole('button',{name:'Activar especie'})).toBeInTheDocument();
        expect(screen.getByText('¡Especie desactivada correctamente!')).toBeInTheDocument();
    }
    );
}
);
