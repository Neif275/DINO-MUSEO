import { Link } from "react-router-dom";
import FilaTarifa from "./FilaTarifa";

const tarifas = [
    { id: 1, categoria: 'General (A partir de los 15 años)', precio: '$10.000' },
    { id: 2, categoria: 'Niños (3-14 años)', precio: '$5.000' },
    { id: 3, categoria: 'Adultos Mayores(A partir de los 65 años) y menores de 3 años', precio: 'Gratis' },
];

function Horarios()
{
    return(
        <section>
            <h2>Planifica tu visita</h2>
            <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Información de horarios, ubicación y tarifas para tu proxima visita.</p>

            <div className="row g-4">
                <div className="col-md-6">
                    <article className="card h-100">
                        <div className="card-body">
                            <h3>Horario de atención</h3>
                            <p><strong>Martes a Domingo</strong><br/>10:00 AM - 18:00 PM</p>
                            <p className="subtitle">Lunes cerrado por mantenimiento y conservación.</p>

                            <h3>Ubicación</h3>
                            <p>Av. de la ciencia 1234, parque central</p>
                        </div>
                    </article>
                </div>

                <div className="col-md-6">
                    <article className="card h-100">
                        <div className="card-body">
                            <h3>Tarifas y Entradas</h3>
                            <table className="tabla-precios">
                                <thead>
                                    <tr>
                                        <th>Categoría</th>
                                        <th>Precios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarifas.map((row) => (
                                       <FilaTarifa key={row.id} categoria={row.categoria} precio={row.precio}/>
                                    ))}
                                </tbody>
                            </table>
                            <Link to="/contacto" className="btn-primario">Reservar Entradas Online</Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
export default Horarios;