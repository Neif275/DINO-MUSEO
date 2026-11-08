import { Link } from "react-router-dom";

function Inicio()
{
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
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '.5rem' }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        src="https://www.youtube.com/embed/fdcEKPS6tOQ"
                        title="Sala principal del museo"
                        allowFullScreen>
                    </iframe>
                </div>
            </section>
        </>
    );
}
export default Inicio;