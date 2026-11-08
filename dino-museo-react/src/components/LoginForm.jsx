import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ correo: '', password: '' });
    const [touched, setTouched] = useState({ correo: false, password: false });
    const [submitted, setSubmitted] = useState(false);
    const [mensaje, setMensaje] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (isValid('correo') && isValid('password')) {
            setMensaje('Inicio de sesión exitoso!');
            setTimeout(() => navigate('/admin'), 1500);
        } else {
            setMensaje('');
        }
    };

    return (
        <section className="admin-formulario" style={{ maxWidth: '450px' }}>
            <h2>Iniciar sesión como administrador</h2>
            <p style={{ color: 'var(--c-secundario)', marginBottom: '1.5rem' }}>
                Ingresa tu usuario y contraseña para acceder al panel administrativo.
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
                    <button type="submit" className="btn-primario" id="btnIngresar">Ingresar</button>
                </div>

                <p id="outLogin" className="hint" style={{ marginTop: '1rem' }}>{mensaje}</p>
            </form>
        </section>
    );
}

export default LoginForm;
