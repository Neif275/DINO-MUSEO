import { Link } from "react-router-dom";
function DinoCard({dino})
{
const imagen = <img src={dino.imagen} alt={dino.nombre}/>;
return(
<Link to={'/exposicion/' + dino.id} className="tarjeta-dino" id={dino.id}>
<article className="card">
{dino.imagen && (dino.claseImagen ? <div className={dino.claseImagen}>{imagen}
</div> : imagen)}
<div className="card-body">
<h3>{dino.nombre}</h3>
<p className="subtitle">{dino.descripcion}</p>
</div>
</article>
</Link>
);
}
export default DinoCard;