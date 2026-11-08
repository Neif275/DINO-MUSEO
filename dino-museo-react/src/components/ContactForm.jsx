import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
    const [values, setValues] = useState({ nombres: '', apellidos: '', correo: '', mensaje: '' });
    const [touched, setTouched] = useState({ nombres: false, apellidos: false, correo: false, mensaje: false });
    const [submitted, setSubmitted] = useState(false);
    const [enviado, setEnviado] = useState('');

    const errors = {
        nombres: values.nombres.trim() === '' ? 'Dato obligatorio' : '',
        apellidos: values.apellidos.trim() === '' ? 'Dato obligatorio' : '',
        correo: values.correo.trim() === ''
            ? 'Dato obligatorio'
            : EMAIL_RE.test(values.correo.trim()) ? '' : 'Correo no válido',
        mensaje: values.mensaje.trim() === '' ? 'Dato obligatorio' : '',
    };

    const isValid = (field) => !errors[field];

    // el error se muestra si el usuario ya pasó por el campo o intentó enviar
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
        if (isValid('nombres') && isValid('apellidos') && isValid('correo') && isValid('mensaje')) {
            setEnviado('¡Formulario enviado correctamente! Nos contactaremos a la brevedad.');
            setValues({ nombres: '', apellidos: '', correo: '', mensaje: '' });
            setTouched({ nombres: false, apellidos: false, correo: false, mensaje: false });
            setSubmitted(false);
        } else {
            setEnviado('');
        }
    };

    return (
        <section>
            <h2>Reservas de Visitas y Consultas</h2>
            <p style={{ color: 'var(--c-secundario)' }}>
                Completa los datos para agendar una visita guiada o delegaciones de colegios.
            </p>

            <form id="formContacto" onSubmit={handleSubmit} noValidate>
                <div className={fieldClass('nombres')}>
                    <label htmlFor="nombres">Nombres</label>
                    <div className="campo-control">
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            autoComplete="name"
                            placeholder="Ej: María Elena"
                            value={values.nombres}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className="icono-error">X</span>
                    </div>
                    <p className="mensaje-error">{showError('nombres') ? errors.nombres : ''}</p>
                </div>

                <div className={fieldClass('apellidos')}>
                    <label htmlFor="apellidos">Apellidos</label>
                    <div className="campo-control">
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            autoComplete="family-name"
                            placeholder="Ej: Pérez González"
                            value={values.apellidos}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className="icono-error">X</span>
                    </div>
                    <p className="mensaje-error">{showError('apellidos') ? errors.apellidos : ''}</p>
                </div>

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

                <div className={fieldClass('mensaje')}>
                    <label htmlFor="mensaje">Detalles de la Reserva</label>
                    <div className="campo-control">
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="4"
                            placeholder="Escribe tu mensaje o cantidad de entradas..."
                            value={values.mensaje}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <span className="icono-error">X</span>
                    </div>
                    <p className="mensaje-error">{showError('mensaje') ? errors.mensaje : ''}</p>
                </div>

                <button type="submit" className="btn-primario" id="btnEnviar">Enviar Consulta</button>
                <p id="outContacto" className="hint">{enviado}</p>
            </form>
        </section>
    );
}

export default ContactForm;
