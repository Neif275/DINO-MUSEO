import { Link, useParams } from "react-router-dom";
import { dinosaurios } from "../data/dinosaurios.js";

function DinoDetalle()
{
    // id que viene en la URL, por ejemplo /exposicion/trex
    const { id } = useParams();
    const dino = dinosaurios.find((d) => d.id === id);

    if (!dino || (localStorage.getItem(dino.id) || dino.estado) === 'inactivo') {
        return (
            <section>
                <h2>Dinosaurio no encontrado</h2>
                <div className="volver-exposicion">
                    <Link to="/exposicion" className="btn-primario">← Volver a la exposición</Link>
                </div>
            </section>
        );
    }

    const datos = [
        { titulo: 'Familia', valor: dino.familia },
        { titulo: 'Grupo', valor: dino.grupo },
        { titulo: 'Período', valor: dino.periodo },
        { titulo: 'Antigüedad', valor: dino.antiguedad },
        { titulo: 'Alimentación', valor: dino.alimentacion },
        { titulo: 'Longitud', valor: dino.longitud },
        { titulo: 'Peso', valor: dino.peso },
        { titulo: 'Ubicación', valor: dino.ubicacion },
    ];

    return (
        <>
            <section className="dinosaurio-detalle">
                <div className="dinosaurio-imagenes">
                    {dino.imagenes.map((imagen) => {
                        const link = (
                            <a href={imagen.src} target="_blank" rel="noopener" key={imagen.src}>
                                <img src={imagen.src} alt={imagen.alt} />
                            </a>
                        );
                        return imagen.clase ? <div className={imagen.clase} key={imagen.src}>{link}</div> : link;
                    })}
                </div>
                <div className="dinosaurio-info">
                    <h2>{dino.nombre}</h2>
                    <p className="subtitle">{dino.subtitulo}</p>
                    <ul className="dinosaurio-datos">
                        {datos.map((dato) => (
                            <li key={dato.titulo}>
                                <strong>{dato.titulo}:</strong> {dato.valor}
                            </li>
                        ))}
                    </ul>
                    <h3>{dino.tituloSobre}</h3>
                    {dino.sobre.map((parrafo) => (
                        <p key={parrafo}>{parrafo}</p>
                    ))}
                    <h3>¿Sabías que?</h3>
                    <p>{dino.dato}</p>
                </div>
            </section>
            <div className="volver-exposicion">
                <Link to="/exposicion" className="btn-primario">← Volver a la exposición</Link>
            </div>
        </>
    );
}

export default DinoDetalle;
