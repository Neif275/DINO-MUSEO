import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import { Link } from 'react-router-dom'
import { contactos } from '../data/contactos'
function ContactTable()
{
    const exportExcel = () =>
    {
        const worksheet = XLSX.utils.json_to_sheet(contactos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Contactos");
        const excelBuffer = XLSX.write(workbook,{bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer],{type:"application/octet-stream"});
        saveAs(data,"contactos.xlsx");
    }

    return(
        <section className="admin-seccion">
            <h2>Reservas y contactos</h2>
            <p className="subtitle">Consulta las solicitudes recibidas por el museo.</p>
            <div className="tabla-contenedor">
                <table className="tabla-precios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactos.map((row) =>(
                            <tr key={row.id}>
                                <td>{row.nombre}</td>
                                <td>{row.correo}</td>
                                <td><Link to={'/admin/contacto?contacto=' + row.id} className="btn-tabla">Ver</Link></td>
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
export default ContactTable
