import { Link, useLocation } from "react-router-dom";
import { contactos } from "../data/contactos";

function ContactDetail()
{
    // lee el parametro GET de la URL: /admin/contacto?contacto=1
    const location = useLocation();
    const numero = new URLSearchParams(location.search).get('contacto');
    const contacto = contactos.find((c) => String(c.id) === numero);

    return(
        <>
            <section className="hero">
                <h2>Ver contacto</h2>
                <p>Información del mensaje recibido desde el formulario de contacto.</p>
            </section>

            <section className="admin-formulario">
                <h2 id="tituloContacto">{contacto ? 'Contacto de ' + contacto.nombre : 'Contacto no encontrado'}</h2>

                <div className="campo">
                    <label htmlFor="nombreContacto">Nombre</label>
                    <input type="text" id="nombreContacto" value={contacto ? contacto.nombre : ''} readOnly/>
                </div>

                <div className="campo">
                    <label htmlFor="correoContacto">Correo electrónico</label>
                    <input type="email" id="correoContacto" value={contacto ? contacto.correo : ''} readOnly/>
                </div>

                <div className="campo">
                    <label htmlFor="fechaContacto">Fecha</label>
                    <input type="text" id="fechaContacto" value={contacto ? contacto.fecha : ''} readOnly/>
                </div>

                <div className="campo">
                    <label htmlFor="mensajeContacto">Mensaje</label>
                    <textarea id="mensajeContacto" rows="6" value={contacto ? contacto.mensaje : ''} readOnly></textarea>
                </div>

                <div className="admin-formulario-acciones">
                    <Link to="/admin" className="btn-primario">Volver a contactos</Link>
                </div>
            </section>
        </>
    );
}
export default ContactDetail;
