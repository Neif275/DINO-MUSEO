import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../services/api";

// Crear (/admin/entradas/nueva) o editar (/admin/entradas/:id/editar) una entrada. Solo ADMIN.
function EntradaForm()
{
    const { id } = useParams();
    const esNueva = id === undefined;
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState({ nombre: '', descripcion: '', precio: '', cupos: '', categoriaId: '', activo: true });
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [errorApi, setErrorApi] = useState('');

    useEffect(() => {
        apiFetch('/categorias').then(setCategorias).catch((e) => setErrorApi(e.message));
        if (!esNueva) {
            apiFetch('/productos/' + id)
                .then((p) => setValues({
                    nombre: p.nombre,
                    descripcion: p.descripcion || '',
                    precio: String(p.precio),
                    cupos: String(p.cupos),
                    categoriaId: String(p.categoria.id),
                    activo: p.activo,
                }))
                .catch((e) => setErrorApi(e.message));
        }
    }, [id, esNueva]);

    const numeroValido = (texto) => texto !== '' && Number.isInteger(Number(texto)) && Number(texto) >= 0;

    const errors = {
        nombre: values.nombre.trim() === '' ? 'Dato obligatorio' : '',
        precio: numeroValido(values.precio) ? '' : 'Debe ser un número entero mayor o igual a 0',
        cupos: numeroValido(values.cupos) ? '' : 'Debe ser un número entero mayor o igual a 0',
        categoriaId: values.categoriaId === '' ? 'Elige una categoría' : '',
    };

    const isValid = (field) => !errors[field];
    const showError = (field) => (touched[field] || submitted) && !isValid(field);
    const fieldClass = (field) => showError(field) ? 'campo con-error' : 'campo';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setErrorApi('');
        if (!Object.keys(errors).every(isValid)) return;

        const producto = {
            nombre: values.nombre.trim(),
            descripcion: values.descripcion.trim(),
            precio: Number(values.precio),
            cupos: Number(values.cupos),
            activo: values.activo,
            categoria: { id: Number(values.categoriaId) },
        };
        try {
            await apiFetch(esNueva ? '/productos' : '/productos/' + id, {
                method: esNueva ? 'POST' : 'PUT',
                body: JSON.stringify(producto),
            });
            navigate('/admin/entradas');
        } catch (error) {
            setErrorApi(error.message);
        }
    };

    const campo = (name, label, tipo = 'text') => (
        <div className={fieldClass(name)}>
            <label htmlFor={name}>{label}</label>
            <input type={tipo} id={name} name={name} value={values[name]}
                onChange={handleChange} onBlur={handleBlur}/>
            <p className="mensaje-error">{showError(name) ? errors[name] : ''}</p>
        </div>
    );

    return(
        <section className="admin-formulario">
            <h2>{esNueva ? 'Nueva entrada' : 'Editar entrada'}</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                    {campo('nombre', 'Nombre')}
                    <div className={fieldClass('categoriaId')}>
                        <label htmlFor="categoriaId">Categoría</label>
                        <select id="categoriaId" name="categoriaId" value={values.categoriaId}
                            onChange={handleChange} onBlur={handleBlur} className="tienda-cantidad" style={{ width: '100%' }}>
                            <option value="">Selecciona…</option>
                            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                        <p className="mensaje-error">{showError('categoriaId') ? errors.categoriaId : ''}</p>
                    </div>
                    {campo('precio', 'Precio (0 = gratis)', 'number')}
                    {campo('cupos', 'Cupos disponibles', 'number')}
                </div>
                {campo('descripcion', 'Descripción')}

                <div className="campo">
                    <label htmlFor="activo">
                        <input type="checkbox" id="activo" name="activo" checked={values.activo}
                            onChange={handleChange} style={{ width: 'auto', marginRight: '.5rem' }}/>
                        Activa (se vende en la tienda)
                    </label>
                </div>

                <div className="admin-formulario-acciones">
                    <Link to="/admin/entradas" className="btn-secundario">Cancelar</Link>
                    <button type="submit" className="btn-primario">Guardar</button>
                </div>
                {errorApi && <p className="error-api">{errorApi}</p>}
            </form>
        </section>
    );
}
export default EntradaForm;
