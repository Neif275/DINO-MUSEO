import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dinosaurios } from "../data/dinosaurios";

const campos = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'familia', label: 'Familia' },
    { name: 'grupo', label: 'Grupo' },
    { name: 'periodo', label: 'Período' },
    { name: 'antiguedad', label: 'Antigüedad' },
    { name: 'alimentacion', label: 'Alimentación' },
    { name: 'longitud', label: 'Longitud' },
    { name: 'peso', label: 'Peso' },
    { name: 'ubicacion', label: 'Ubicación' },
];

function EditDinoForm() {
    // id que viene en la URL, por ejemplo /admin/editar/trex
    const { id } = useParams();
    const navigate = useNavigate();
    const dino = dinosaurios.find((d) => d.id === id) || dinosaurios[0];

    const [values,setValues] = useState({
        nombre: dino.nombre,
        familia: dino.familia,
        grupo: dino.grupo,
        periodo: dino.periodo,
        antiguedad: dino.antiguedad,
        alimentacion: dino.alimentacion,
        longitud: dino.longitud,
        peso: dino.peso,
        ubicacion: dino.ubicacion,
        sobre: dino.sobre.join('\n\n'),
        dato: dino.dato,
    });
    const [touched, setTouched] =useState({});
    const [submitted,setSubmitted] = useState(false);
    const [estado,setEstado] = useState(localStorage.getItem(dino.id) || dino.estado);
    const [mensajeEstado,setMensajeEstado] = useState('');
    const [mensajeGuardado,setMensajeGuardado] = useState('');

    // todos los campos son obligatorios
    const errors = {};
    Object.keys(values).forEach((field) => {
        errors[field] = values[field].trim() === '' ? 'Dato obligatorio' : '';
    });

    const isValid = (field) => !errors[field];
    const showError = (field) => (touched[field] || submitted) && !isValid(field);
    const fieldClass = (field) => showError(field) ? 'campo con-error' : 'campo';

    const handleChange = (e) => {
        const {name , value} = e.target;
        setValues((t)=>({...t,[name]:value}));
    };

    const handleBlur = (e) => {
        const {name} = e.target;
        setTouched((t)=>({...t,[name]:true}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if(Object.keys(values).every((field) => isValid(field))){
            setMensajeGuardado('Cambios guardados correctamente');
            setTimeout(() => navigate('/admin'), 1500);
        } else {
            setMensajeGuardado('');
        }
    };

    // switch a falta de base de datos, se guarda en localStorage
    const cambiarEstado = () => {
        const nuevoEstado = estado === 'inactivo' ? 'activo' : 'inactivo';
        setEstado(nuevoEstado);
        localStorage.setItem(dino.id, nuevoEstado);
        setMensajeEstado(nuevoEstado === 'activo' ? '¡Especie activada correctamente!' : '¡Especie desactivada correctamente!');
    };

    return(
        <>
            <section className="hero">
                <h2>Editar dinosaurio</h2>
                <p>Modifica la información del dinosaurio seleccionado.</p>
            </section>

            <section className="admin-formulario">
                <h2 id="tituloDinosaurio">Editar {dino.nombre}</h2>

                <form id="formEditarDinosaurio" onSubmit={handleSubmit} noValidate>
                    <div className="form-grid">
                        {campos.map((campo) => (
                            <div className={fieldClass(campo.name)} key={campo.name}>
                                <label htmlFor={campo.name}>{campo.label}</label>
                                <input
                                    type="text"
                                    id={campo.name}
                                    name={campo.name}
                                    value={values[campo.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className="mensaje-error">{showError(campo.name) ? errors[campo.name] : ''}</p>
                            </div>
                        ))}
                    </div>

                    <div className={fieldClass('sobre')}>
                        <label htmlFor="sobre">Sobre el dinosaurio</label>
                        <textarea
                            id="sobre"
                            name="sobre"
                            rows="5"
                            value={values.sobre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <p className="mensaje-error">{showError('sobre') ? errors.sobre : ''}</p>
                    </div>

                    <div className={fieldClass('dato')}>
                        <label htmlFor="dato">¿Sabías que?</label>
                        <textarea
                            id="dato"
                            name="dato"
                            rows="4"
                            value={values.dato}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <p className="mensaje-error">{showError('dato') ? errors.dato : ''}</p>
                    </div>

                    <div className="admin-formulario-acciones">
                        <Link to="/admin" className="btn-secundario">Cancelar</Link>
                        <button type="submit" className="btn-primario">Guardar cambios</button>
                    </div>

                    <div className="admin-desactivar">
                        <button type="button" id="btnDesactivar" onClick={cambiarEstado}
                            className={estado === 'inactivo' ? 'btn-desactivar btn-activar' : 'btn-desactivar'}>
                            {estado === 'inactivo' ? 'Activar especie' : 'Desactivar especie'}
                        </button>
                    </div>
                    <p id="mensajeDesactivada" className="mensaje-desactivada">{mensajeEstado}</p>

                    <p id="mensajeGuardado" className="hint">{mensajeGuardado}</p>
                </form>
            </section>
        </>
    );
}
export default EditDinoForm;
