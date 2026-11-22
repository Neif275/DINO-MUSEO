import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Crea una cuenta de CLIENTE para comprar entradas
function RegistroForm() {
    const navigate = useNavigate();
    const { registrar } = useAuth();
    const [values, setValues] = useState({ nombre: '', correo: '', password: '' });
    const [touched, setTouched] = useState({ nombre: false, correo: false, password: false });
    const [submitted, setSubmitted] = useState(false);
    const [errorApi, setErrorApi] = useState('');
    const [enviando, setEnviando] = useState(false);

    const errors = {
        nombre: values.nombre.trim() === '' ? 'Dato obligatorio' : '',
        correo: values.correo.trim() === ''
            ? 'Dato obligatorio'
            : EMAIL_RE.test(values.correo.trim()) ? '' : 'Correo no válido',
        password: values.password.length < 6 ? 'Mínimo 6 caracteres' : '',
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
        if (!isValid('nombre') || !isValid('correo') || !isValid('password')) return;

        setEnviando(true);
        try {
            await registrar(values.nombre.trim(), values.correo.trim(), values.password);
            navigate('/tienda', { replace: true });
        } catch (error) {
            setErrorApi(error.message);
        } finally {
            setEnviando(false);
        }
    };

    const campo = (name, label, tipo, placeholder, autoComplete) => (
        <div className={fieldClass(name)}>
            <label htmlFor={name}>{label}</label>
            <div className="campo-control">
                <input
                    type={tipo}
                    id={name}
                    name={name}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <span className="icono-error">X</span>
            </div>
            <p className="mensaje-error">{showError(name) ? errors[name] : ''}</p>
        </div>
    );

    return (
        <section className="admin-formulario" style={{ maxWidth: '450px' }}>
            <h2>Crear cuenta</h2>
            <p style={{ color: 'var(--c-secundario)', marginBottom: '1.5rem' }}>
                Regístrate para comprar tus entradas en línea.
            </p>

            <form id="formRegistro" onSubmit={handleSubmit} noValidate>
                {campo('nombre', 'Nombre completo', 'text', 'Ej: María Elena Pérez', 'name')}
                {campo('correo', 'Correo Electrónico', 'text', 'nombre@correo.cl', 'email')}
                {campo('password', 'Contraseña', 'password', 'Mínimo 6 caracteres', 'new-password')}

                <div className="admin-formulario-acciones" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primario" disabled={enviando}>
                        {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </div>
                {errorApi && <p className="error-api">{errorApi}</p>}
            </form>

            <p style={{ marginTop: '1rem' }}>
                ¿Ya tienes cuenta? <Link to="/admin/login" className="link-texto">Inicia sesión</Link>
            </p>
        </section>
    );
}

export default RegistroForm;
