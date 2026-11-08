import { Link, NavLink, useLocation } from "react-router-dom";

function NavBar()
{
    const location = useLocation();
    const ruta = location.pathname;
    const esAdmin = ruta.startsWith('/admin') && ruta !== '/admin/login';

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
                    </ul>
                ) : (
                    <ul>
                        <li><NavLink to="/" end>Inicio</NavLink></li>
                        <li><NavLink to="/exposicion">Exposición</NavLink></li>
                        <li><NavLink to="/horarios">Horarios y Precios</NavLink></li>
                        <li><NavLink to="/contacto">Contacto y Reservas</NavLink></li>
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default NavBar