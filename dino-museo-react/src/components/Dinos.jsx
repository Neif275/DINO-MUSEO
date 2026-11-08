import DinoCard from "./DinoCard";
import { dinosaurios } from "../data/dinosaurios.js";
function Dinos() {
// solo se muestran los dinosaurios activos, el estado se guarda en localStorage
const activos = dinosaurios.filter(
(dino) => (localStorage.getItem(dino.id) || dino.estado) === 'activo'
);
return(
<section>
<h2>Reino de Gigantes - Especies en exhibición</h2>
<p className="subtitle" style={{ marginBottom: '1.5rem' }}>Conoce a los
principales protagonistas de nuestra colección paleontológica.</p>
<div className="grid-demo">
{activos.map(
(dino)=>(
<DinoCard dino={dino} key={dino.id}/>
)
)
}
</div>
</section>
);
}
export default Dinos