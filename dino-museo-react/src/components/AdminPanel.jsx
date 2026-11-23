import { Link } from "react-router-dom";
import DataTable from "./DataTable";
import ChartSection from "./ChartSection";
import ContactTable from "./ContactTable";
import { dinosaurios } from "../data/dinosaurios";
import { contactos } from "../data/contactos";
import { useAuth } from "../context/AuthContext";

// El administrador ve todo. El vendedor solo ve los accesos a entradas y boletas:
// las demas secciones ni siquiera se dibujan para el.
function AdminPanel()
{
    const { usuario, tieneRol } = useAuth();
    const esAdmin = tieneRol('ADMIN');

    return(
        <>
            <section className="hero">
                <h2>Panel Administrativo</h2>
                <p>Sesión iniciada como {usuario.nombre} ({esAdmin ? 'Administrador' : 'Vendedor'})</p>
            </section>

            <section>
                <h2>Tienda de entradas</h2>
                <p className="subtitle">Información que viene del backend</p>
                <div className="grid-demo">
                    <article className="card">
                        <div className="card-body">
                            <h3>Entradas</h3>
                            <p>Tipos de entrada, precios y cupos.</p>
                            <Link to="/admin/entradas" className="btn-primario">Ver entradas</Link>
                        </div>
                    </article>

                    <article className="card">
                        <div className="card-body">
                            <h3>Boletas</h3>
                            <p>Compras realizadas por los clientes.</p>
                            <Link to="/admin/boletas" className="btn-primario">Ver boletas</Link>
                        </div>
                    </article>
                </div>
            </section>

            {esAdmin && (
                <>
                    <section className="admin-seccion">
                        <h2>Resumen del museo</h2>
                        <p className="subtitle">Información general del sistema</p>
                        <div className="grid-demo">
                            <article className="card">
                                <div className="card-body">
                                    <h3>Dinosaurios</h3>
                                    <p className="admin-numero">{dinosaurios.length}</p>
                                    <p>Especies registradas actualmente</p>
                                </div>
                            </article>

                            <article className="card">
                                <div className="card-body">
                                    <h3>Formularios</h3>
                                    <p className="admin-numero">{contactos.length}</p>
                                    <p>Formularios recibidos</p>
                                </div>
                            </article>
                        </div>
                    </section>

                    <DataTable/>
                    <ContactTable/>
                    <ChartSection/>
                </>
            )}
        </>
    );
}
export default AdminPanel;
