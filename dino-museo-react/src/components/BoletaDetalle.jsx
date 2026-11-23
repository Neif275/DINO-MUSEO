import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../services/api";
import { formatearFecha, formatearPrecio } from "../utils/formato";

function BoletaDetalle()
{
    const { id } = useParams();
    const [boleta, setBoleta] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        apiFetch('/boletas/' + id)
            .then(setBoleta)
            .catch((e) => setError(e.message));
    }, [id]);

    if (error) return <p className="error-api">{error}</p>;
    if (!boleta) return <p className="subtitle">Cargando...</p>;

    return(
        <section className="admin-formulario">
            <h2>Boleta N° {boleta.id}</h2>
            <ul className="dinosaurio-datos">
                <li><strong>Cliente:</strong> {boleta.usuario.nombre} ({boleta.usuario.correo})</li>
                <li><strong>Fecha de compra:</strong> {formatearFecha(boleta.fecha)}</li>
                <li><strong>Fecha de visita:</strong> {formatearFecha(boleta.fechaVisita)}</li>
            </ul>

            <div className="tabla-contenedor">
                <table className="tabla-precios">
                    <thead>
                        <tr>
                            <th>Entrada</th>
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boleta.detalles.map((detalle) => (
                            <tr key={detalle.id}>
                                <td>{detalle.producto.nombre}</td>
                                <td>{detalle.cantidad}</td>
                                <td>{formatearPrecio(detalle.precioUnitario)}</td>
                                <td>{'$' + detalle.subtotal.toLocaleString('es-CL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="tienda-total" style={{ textAlign: 'right', marginTop: '1rem' }}>
                Total: {'$' + boleta.total.toLocaleString('es-CL')}
            </p>
            <div className="admin-formulario-acciones">
                <Link to="/admin/boletas" className="btn-secundario">Volver a boletas</Link>
            </div>
        </section>
    );
}
export default BoletaDetalle;
