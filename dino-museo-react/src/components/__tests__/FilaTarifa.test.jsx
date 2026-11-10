import { render, screen } from "@testing-library/react";
import FilaTarifa from "../FilaTarifa";
import { describe, expect, it } from "vitest";


describe('Componente FilaTarifa', () => {
    it('Muestra la categoria y el precio recibidos por props', () => {
        render(<table><tbody><FilaTarifa categoria="Niños (3-14 años)" precio="$5.000"/></tbody></table>);

        expect(screen.getByText('Niños (3-14 años)')).toBeInTheDocument();
        expect(screen.getByText('$5.000')).toBeInTheDocument();
    });


    it('Cambia lo que muestra segun las props', () => {
        render(<table><tbody><FilaTarifa categoria="Menores de 3 años" precio="Gratis"/></tbody></table>);

        expect(screen.getByText('Menores de 3 años')).toBeInTheDocument();
        expect(screen.getByText('Gratis')).toBeInTheDocument();
        expect(screen.queryByText('$5.000')).not.toBeInTheDocument();
    });
});