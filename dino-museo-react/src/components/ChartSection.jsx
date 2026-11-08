import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { dinosaurios } from "../data/dinosaurios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale,LinearScale);

function ChartSection()
{
    // cuenta cuantas especies hay en cada periodo
    const periodos = ["Jurásico tardío","Cretácico temprano","Cretácico tardío"];
    const cantidades = periodos.map(
        (periodo) => dinosaurios.filter((dino) => dino.periodo === periodo).length
    );

    const data = {
        labels: periodos,
        datasets:[
            {
                label: "Especies",
                data: cantidades,
                backgroundColor: "rgba(200,150,12,0.5)",
                borderColor:"rgba(200,150,12,1)",
                borderWidth:1
            },
        ],
    };

    const options ={
        responsive: true,
        plugins:{
            legend: {position:"top"},
            title:{display:true, text:"Especies por período"}
        }
    };

    return(
        <section className="admin-seccion">
            <h2>Gráfico</h2>
            <p className="subtitle">Cantidad de especies registradas en cada período.</p>
            <div className="grafico-contenedor">
                <Bar data={data} options={options}/>
            </div>
        </section>
    );
}
export default ChartSection;
