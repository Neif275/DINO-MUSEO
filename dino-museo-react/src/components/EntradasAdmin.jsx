import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { formatearPrecio } from "../utils/formato";

// Lista de entradas del panel. El vendedor solo puede verlas;
// los botones de crear, editar y eliminar solo aparecen para el administrador.
function EntradasAdmin()
{
    const { tieneRol } = useAuth();
    const esAdmin = tieneRol('ADMIN');
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');

    const cargar = () => {
        apiFetch('/productos')
            .then(setProductos)
            .catch((e) => setError(e.message));
    };

    useEffect(cargar, []);

    const eliminar = async (producto) => {
        if (!window.confirm('¿Eliminar la entrada ' + producto.nombre + '?')) return;
        setError('');
        try {
            await apiFetch('/productos/' + producto.id, { method: 'DELETE' });
            cargar();
        } catch (e) {
            setError(e.message);
        }
    };

    return(
        <section>
            <h2>Gestión de entradas</h2>
            <p className="subtitle">Tipos de entrada que se venden en la tienda.</p>

            {esAdmin && (
                <div className="admin-acciones">
                    <Link to="/admin/entradas/nueva" className="btn-primario">Nueva entrada</Link>
                </div>
            )}

            {error && <p className="error-api">{error}</p>}

            <div className="tabla-contenedor">
                <table className="tabla-precios">
                    <thead>
                        <tr>
                            <th>Entrada</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Cupos</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria.nombre}</td>
                                <td>{formatearPrecio(producto.precio)}</td>
                                <td>{producto.cupos}</td>
                                <td>
                                    <span className={producto.activo ? 'badge activo' : 'badge inactivo'}>
                                        {producto.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    <div className="acciones-tabla">
                                        <Link to={'/admin/entradas/' + producto.id} className="btn-tabla">Ver</Link>
                                        {esAdmin && (
                                            <>
                                                <Link to={'/admin/entradas/' + producto.id + '/editar'} className="btn-tabla">Editar</Link>
                                                <button type="button" className="btn-eliminar" onClick={() => eliminar(producto)}>Eliminar</button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
export default EntradasAdmin;
