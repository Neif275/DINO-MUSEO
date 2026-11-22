import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Despues del login cada rol va a su pagina
const INICIO_POR_ROL = { ADMIN: '/admin', VENDEDOR: '/admin', CLIENTE: '/tienda' };

// Si venia de una pagina protegida, vuelve a ella solo si su rol tiene permiso
function puedeEntrar(rol, ruta) {
    if (ruta.startsWith('/admin')) return rol !== 'CLIENTE';
    if (ruta === '/tienda') return rol !== 'VENDEDOR';
    return true;
}

function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [values, setValues] = useState({ correo: '', password: '' });
    const [touched, setTouched] = useState({ correo: false, password: false });
    const [submitted, setSubmitted] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [errorApi, setErrorApi] = useState('');
    const [enviando, setEnviando] = useState(false);

    const errors = {
        correo: values.correo.trim() === ''
            ? 'Dato obligatorio'
            : EMAIL_RE.test(values.correo.trim()) ? '' : 'Correo no válido',
        password: values.password.trim() === '' ? 'Dato obligatorio' : '',
    };

    const isValid = (field) => !errors[field];
    const showError = (field) => (touched[field] || submitted) && !isValid(field);
    const fieldClass = (field) => showError(field) ? 'campo con-error' : 'campo';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((t) => ({ ...t, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setErrorApi('');
        setMensaje('');
        if (!isValid('correo') || !isValid('password')) return;

        setEnviando(true);
        try {
            // el backend valida la contraseña y responde con el token JWT y el rol
            const usuario = await login(values.correo.trim(), values.password);
            setMensaje('Inicio de sesión exitoso!');
            const desde = location.state?.desde;
            const destino = desde && puedeEntrar(usuario.rol, desde) ? desde : INICIO_POR_ROL[usuario.rol];
            setTimeout(() => navigate(destino, { replace: true }), 800);
        } catch (error) {
            setErrorApi(error.message);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <section className="admin-formulario" style={{ maxWidth: '450px' }}>
            <h2>Iniciar sesión</h2>
            <p style={{ color: 'var(--c-secundario)', marginBottom: '1.5rem' }}>
                Ingresa con tu cuenta para comprar entradas o acceder al panel administrativo.
            </p>

            <form id="formLogin" onSubmit={handleSubmit} noValidate>
                <div className={fieldClass('correo')}>
                    <label htmlFor="correo">Correo Electrónico</label>
                    <div className="campo-control">
                        <input
                            type="text"
                            id="correo"
                            name="correo"
                            autoComplete="email"
                            placeholder="nombre@correo.cl"
                            value={values.correo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className="icono-error">X</span>
                    </div>
                    <p className="mensaje-error">{showError('correo') ? errors.correo : ''}</p>
                </div>

                <div className={fieldClass('password')}>
                    <label htmlFor="password">Contraseña</label>
                    <div className="campo-control">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className="icono-error">X</span>
                    </div>
                    <p className="mensaje-error">{showError('password') ? errors.password : ''}</p>
                </div>

                <div className="admin-formulario-acciones" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primario" id="btnIngresar" disabled={enviando}>
                        {enviando ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </div>

                <p id="outLogin" className="hint" style={{ marginTop: '1rem' }}>{mensaje}</p>
                {errorApi && <p className="error-api">{errorApi}</p>}
            </form>

            <p style={{ marginTop: '1rem' }}>
                ¿No tienes cuenta? <Link to="/registro" className="link-texto">Regístrate aquí</Link>
            </p>
        </section>
    );
}

export default LoginForm;
