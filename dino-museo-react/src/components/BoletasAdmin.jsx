import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatearFecha } from "../utils/formato";

// Lista de boletas (ventas). La ven el vendedor y el administrador; solo el administrador puede anular.
function BoletasAdmin()
{
    const { tieneRol } = useAuth();
    const esAdmin = tieneRol('ADMIN');
    const [boletas, setBoletas] = useState([]);
    const [error, setError] = useState('');

    const cargar = () => {
        apiFetch('/boletas')
            .then(setBoletas)
            .catch((e) => setError(e.message));
    };

    useEffect(cargar, []);

    const anular = async (boleta) => {
        if (!window.confirm('¿Anular la boleta N° ' + boleta.id + '? Los cupos vuelven a quedar disponibles.')) return;
        try {
            await apiFetch('/boletas/' + boleta.id, { method: 'DELETE' });
            cargar();
        } catch (e) {
            setError(e.message);
        }
    };

    return(
        <section>
            <h2>Boletas</h2>
            <p className="subtitle">Compras de entradas realizadas por los clientes.</p>
            {error && <p className="error-api">{error}</p>}

            {boletas.length === 0 && !error ? (
                <p className="subtitle">Aún no hay ventas.</p>
            ) : (
                <div className="tabla-contenedor">
                    <table className="tabla-precios">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Cliente</th>
                                <th>Compra</th>
                                <th>Visita</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boletas.map((boleta) => (
                                <tr key={boleta.id}>
                                    <td>{boleta.id}</td>
                                    <td>{boleta.usuario.nombre}</td>
                                    <td>{formatearFecha(boleta.fecha)}</td>
                                    <td>{formatearFecha(boleta.fechaVisita)}</td>
                                    <td>{'$' + boleta.total.toLocaleString('es-CL')}</td>
                                    <td>
                                        <div className="acciones-tabla">
                                            <Link to={'/admin/boletas/' + boleta.id} className="btn-tabla">Ver</Link>
                                            {esAdmin && (
                                                <button type="button" className="btn-eliminar" onClick={() => anular(boleta)}>Anular</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
export default BoletasAdmin;
