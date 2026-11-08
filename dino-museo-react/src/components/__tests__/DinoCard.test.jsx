import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DinoCard from "../DinoCard";
import { dinosaurios } from "../../data/dinosaurios";
import { describe, expect, it } from "vitest";

describe('Componente DinoCard', () => {
    it('Muestra el nombre, la imagen y el link a la ficha', () => {
        render(<MemoryRouter><DinoCard dino={dinosaurios[0]} /></MemoryRouter>);

        expect(screen.getByText('Tyrannosaurus Rex')).toBeInTheDocument();
        expect(screen.getByAltText('Tyrannosaurus Rex')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/exposicion/trex');
    });
});
