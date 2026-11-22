import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar()
{
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();
    const ruta = location.pathname;
    const esAdmin = ruta.startsWith('/admin') && ruta !== '/admin/login';

    // primero se sale de la pagina protegida y despues se borra la sesion
    const cerrarSesion = () => {
        navigate('/');
        logout();
    };

    // lo que se muestra al final del menu depende de si hay sesion y del rol
    const opcionesSesion = usuario ? (
        <>
            {!esAdmin && (usuario.rol === 'ADMIN' || usuario.rol === 'VENDEDOR') && (
                <li><NavLink to="/admin">Panel</NavLink></li>
            )}
            <li><button type="button" className="nav-boton" onClick={cerrarSesion}>Cerrar sesión ({usuario.nombre})</button></li>
        </>
    ) : (
        <li><NavLink to="/admin/login">Ingresar</NavLink></li>
    );

    return(
        <header className="site-header">
            {ruta == '/' ? (
                <h1>DINO-MUSEO</h1>
            ) : (
                <Link to={esAdmin ? "/admin" : "/"}><h1>DINO-MUSEO</h1></Link>
            )}
            <nav className="main-nav">
                {esAdmin ? (
                    <ul>
                        {ruta !== '/admin' && (
                            <li><NavLink to="/admin">Panel de Administración</NavLink></li>
                        )}
                        <li><Link to="/">Volver al sitio</Link></li>
                        {usuario && opcionesSesion}
                    </ul>
                ) : (
                    <ul>
                        <li><NavLink to="/" end>Inicio</NavLink></li>
                        <li><NavLink to="/exposicion">Exposición</NavLink></li>
                        <li><NavLink to="/horarios">Horarios y Precios</NavLink></li>
                        <li><NavLink to="/contacto">Contacto y Reservas</NavLink></li>
                        <li><NavLink to="/tienda">Tienda</NavLink></li>
                        {opcionesSesion}
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default NavBar
