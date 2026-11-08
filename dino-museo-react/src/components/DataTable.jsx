import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import { Link } from 'react-router-dom'
import { dinosaurios } from '../data/dinosaurios'
function DataTable()
{
    // el estado activo/inactivo se guarda en localStorage
    const especies = dinosaurios.map((dino) => ({
        ...dino,
        estado: localStorage.getItem(dino.id) || dino.estado
    }));

    const exportExcel = () =>
    {
        const filas = especies.map((row) => ({
            Especie: row.nombre,
            Familia: row.familia,
            Periodo: row.periodo,
            Alimentacion: row.alimentacion,
            Estado: row.estado
        }));
        const worksheet = XLSX.utils.json_to_sheet(filas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Especies");
        const excelBuffer = XLSX.write(workbook,{bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer],{type:"application/octet-stream"});
        saveAs(data,"especies.xlsx");
    }
    return(
        <section className="admin-seccion">
            <h2>Gestión de especies</h2>
            <p className="subtitle">Consulta y administra las especies registradas</p>

            <div className="tabla-contenedor">
                <table className="tabla-precios">
                    <thead>
                        <tr>
                            <th>Especie</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especies.map((row) =>(
                            <tr key={row.id}>
                                <td>{row.nombre}</td>
                                <td>
                                    <span className={'badge ' + row.estado}>
                                        {row.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td><Link to={'/admin/editar/' + row.id} className="btn-tabla">Editar</Link></td>
                            </tr>
                        )
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className="admin-acciones">
                <button className="btn-primario" onClick={exportExcel}>Exportar</button>
            </div>
        </section>
    );
}
export default DataTable
