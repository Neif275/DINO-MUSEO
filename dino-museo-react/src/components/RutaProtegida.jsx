import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Envuelve una pagina para que solo la vean los roles indicados.
// Sin sesion -> al login. Con sesion pero sin permiso -> a "sin acceso".
function RutaProtegida({ roles, children })
{
    const { usuario, verificando } = useAuth();
    const location = useLocation();

    if (verificando) {
        return <p className="subtitle">Verificando sesión...</p>;
    }
    if (!usuario) {
        return <Navigate to="/admin/login" replace state={{ desde: location.pathname }}/>;
    }
    if (roles && !roles.includes(usuario.rol)) {
        return <Navigate to="/sin-acceso" replace/>;
    }
    return children;
}
export default RutaProtegida;
