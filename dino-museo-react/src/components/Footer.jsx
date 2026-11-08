import { Link, useLocation } from "react-router-dom";

function Footer()
{
    const location = useLocation();
    const esAdmin = location.pathname.startsWith('/admin');

    return(
        <footer>
            <p>2026 DINO-MUSEO. Todos los derechos reservados. </p>
            {!esAdmin && <Link to="/admin/login">Panel administrativo</Link>}
        </footer>
    );
}

export default Footer;