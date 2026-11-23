import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { formatearFecha, formatearPrecio, hoy } from "../utils/formato";

// Tienda de entradas: el cliente elige cantidades y una fecha, y compra.
// Los datos vienen del backend: GET /productos y POST /boletas
function Tienda()
{
    const [productos, setProductos] = useState([]);
    const [misBoletas, setMisBoletas] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [fechaVisita, setFechaVisita] = useState(hoy());
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [compra, setCompra] = useState(null);

    const cargar = () => {
        Promise.all([
            apiFetch('/productos?soloActivos=true'),
            apiFetch('/boletas/mis-boletas'),
        ])
            .then(([listaProductos, listaBoletas]) => {
                setProductos(listaProductos);
                setMisBoletas(listaBoletas);
            })
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false));
    };

    useEffect(cargar, []);

    // agrupa las entradas por categoria: { "Entrada individual": [...], "Visita guiada": [...] }
    const porCategoria = {};
    productos.forEach((producto) => {
        const nombre = producto.categoria.nombre;
        porCategoria[nombre] = porCategoria[nombre] || [];
        porCategoria[nombre].push(producto);
    });

    const items = productos
        .filter((producto) => (cantidades[producto.id] || 0) > 0)
        .map((producto) => ({ producto, cantidad: cantidades[producto.id] }));
    const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);

    const cambiarCantidad = (producto, valor) => {
        const cantidad = Math.max(0, Math.min(Number(valor) || 0, producto.cupos));
        setCantidades((c) => ({ ...c, [producto.id]: cantidad }));
    };

    const comprar = async () => {
        setError('');
        setCompra(null);
        try {
            const boleta = await apiFetch('/boletas', {
                method: 'POST',
                body: JSON.stringify({
                    fechaVisita,
                    items: items.map((item) => ({ productoId: item.producto.id, cantidad: item.cantidad })),
                }),
            });
            setCompra(boleta);
            setCantidades({});
            cargar();
        } catch (e) {
            setError(e.message);
        }
    };

    if (cargando && productos.length === 0) {
        return <p className="subtitle">Cargando entradas...</p>;
    }

    return(
        <>
            <section className="hero">
                <h2>Tienda de entradas</h2>
                <p>Compra tus entradas en línea y preséntalas en la boletería el día de tu visita.</p>
            </section>

            <section>
                <div className="campo" style={{ maxWidth: '300px' }}>
                    <label htmlFor="fechaVisita">Fecha de la visita</label>
                    <input type="date" id="fechaVisita" min={hoy()} value={fechaVisita}
                        onChange={(e) => setFechaVisita(e.target.value)}
                        className="tienda-cantidad" style={{ width: '100%' }}/>
                </div>

                <div className="grid-demo">
                    {Object.keys(porCategoria).map((categoria) => (
                        <article className="card" key={categoria}>
                            <div className="card-body">
                                <h3>{categoria}</h3>
                                <table className="tabla-precios">
                                    <thead>
                                        <tr>
                                            <th>Entrada</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {porCategoria[categoria].map((producto) => (
                                            <tr key={producto.id}>
                                                <td>
                                                    {producto.nombre}<br/>
                                                    <span className="subtitle">{producto.descripcion} · {producto.cupos} disponibles</span>
                                                </td>
                                                <td>{formatearPrecio(producto.precio)}</td>
                                                <td>
                                                    <input type="number" min="0" max={producto.cupos}
                                                        aria-label={'Cantidad ' + producto.nombre}
                                                        className="tienda-cantidad"
                                                        value={cantidades[producto.id] || 0}
                                                        onChange={(e) => cambiarCantidad(producto, e.target.value)}/>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="tienda-resumen">
                    <div>
                        <p className="subtitle" style={{ margin: 0 }}>Total a pagar</p>
                        <p className="tienda-total" style={{ margin: 0 }}>{'$' + total.toLocaleString('es-CL')}</p>
                    </div>
                    <button type="button" className="btn-primario" onClick={comprar} disabled={items.length === 0}>
                        Comprar entradas
                    </button>
                </div>

                {error && <p className="error-api">{error}</p>}
                {compra && (
                    <p className="hint" style={{ marginTop: '1rem' }}>
                        ¡Compra realizada! Boleta N° {compra.id} por {'$' + compra.total.toLocaleString('es-CL')} para el {formatearFecha(compra.fechaVisita)}.
                    </p>
                )}
            </section>

            <section className="admin-seccion">
                <h2>Mis compras</h2>
                {misBoletas.length === 0 ? (
                    <p className="subtitle">Todavía no has comprado entradas.</p>
                ) : (
                    <div className="tabla-contenedor">
                        <table className="tabla-precios">
                            <thead>
                                <tr>
                                    <th>Boleta</th>
                                    <th>Fecha de visita</th>
                                    <th>Entradas</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {misBoletas.map((boleta) => (
                                    <tr key={boleta.id}>
                                        <td>N° {boleta.id}</td>
                                        <td>{formatearFecha(boleta.fechaVisita)}</td>
                                        <td>{boleta.detalles.map((d) => d.cantidad + ' ' + d.producto.nombre).join(', ')}</td>
                                        <td>{'$' + boleta.total.toLocaleString('es-CL')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    );
}
export default Tienda;
