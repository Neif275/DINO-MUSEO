import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatearPrecio } from "../utils/formato";

function EntradaDetalle()
{
    const { id } = useParams();
    const { tieneRol } = useAuth();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        apiFetch('/productos/' + id)
            .then(setProducto)
            .catch((e) => setError(e.message));
    }, [id]);

    if (error) return <p className="error-api">{error}</p>;
    if (!producto) return <p className="subtitle">Cargando...</p>;

    const datos = [
        ['Categoría', producto.categoria.nombre],
        ['Descripción', producto.descripcion],
        ['Precio', formatearPrecio(producto.precio)],
        ['Cupos disponibles', producto.cupos],
        ['Estado', producto.activo ? 'Activa (se vende en la tienda)' : 'Inactiva (no aparece en la tienda)'],
    ];

    return(
        <section className="admin-formulario">
            <h2>Entrada: {producto.nombre}</h2>
            <ul className="dinosaurio-datos">
                {datos.map(([titulo, valor]) => (
                    <li key={titulo}><strong>{titulo}:</strong> {valor}</li>
                ))}
            </ul>
            <div className="admin-formulario-acciones">
                <Link to="/admin/entradas" className="btn-secundario">Volver</Link>
                {tieneRol('ADMIN') && (
                    <Link to={'/admin/entradas/' + producto.id + '/editar'} className="btn-primario">Editar</Link>
                )}
            </div>
        </section>
    );
}
export default EntradaDetalle;
