import { Link } from "react-router-dom";
import { useState } from "react";

function Inicio()
{
    const [mostrarVideo, setMostrarVideo] = useState(true);

    return(
        <>
            <section className="hero">
                <h2>Reino de Gigantes</h2>
                <p>Viaja millones de años al pasado y descubre los fosiles mas fascinantes de la era de los dinosaurios.</p>
                <Link to="/contacto" className="btn-primario">Reservar Entradas</Link>
            </section>

            <section style={{ background: 'var(--c-card)', padding: '1.5rem', borderRadius: '.8rem', border: '1px solid var(--c-borde)', textAlign: 'center' }}>
                <h2>Recorrido Virtual</h2>
                <p style={{ color: 'var(--c-secundario)' }}>Observa un adelanto de lo que es nuestra sala principal.</p>
                <button type="button" className="btn-secundario" onClick={() => setMostrarVideo(!mostrarVideo)}>
                    {mostrarVideo ? 'Ocultar recorrido' : 'Mostrar recorrido'}
 </button>
                {mostrarVideo && (
                    <div className="ratio ratio-16x9 mt-3" style={{ borderRadius: '.5rem', overflow: 'hidden' }}>
                        <iframe
                            src="https://www.youtube.com/embed/fdcEKPS6tOQ"
                            title="Sala principal del museo"
                            style={{ border: 0 }}
                            allowFullScreen>
                        </iframe>
                    </div>
                )}
            </section>
        </>
    );
}
export default Inicio;