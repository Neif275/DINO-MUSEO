import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SinAcceso()
{
    const { usuario } = useAuth();
    const inicio = usuario && usuario.rol === 'CLIENTE' ? '/tienda' : '/admin';

    return(
        <section className="admin-formulario" style={{ maxWidth: '450px', textAlign: 'center' }}>
            <h2>Acceso restringido</h2>
            <p className="subtitle">Tu cuenta no tiene permisos para ver esta página.</p>
            <div className="admin-formulario-acciones" style={{ justifyContent: 'center' }}>
                <Link to={inicio} className="btn-primario">Volver</Link>
            </div>
        </section>
    );
}
export default SinAcceso;
