import DataTable from "./DataTable";
import ChartSection from "./ChartSection";
import ContactTable from "./ContactTable";
import { dinosaurios } from "../data/dinosaurios";
import { contactos } from "../data/contactos";

function AdminPanel()
{
    return(
        <>
            <section className="hero">
                <h2>Panel Administrativo</h2>
                <p>Gestiona la información principal de DINO-MUSEO desde este panel</p>
            </section>

            <section>
                <h2>Resumen del museo</h2>
                <p className="subtitle">Información general del sistema</p>
                <div className="grid-demo">
                    <article className="card">
                        <div className="card-body">
                            <h3>Dinosaurios</h3>
                            <p className="admin-numero">{dinosaurios.length}</p>
                            <p>Especies registradas actualmente</p>
                        </div>
                    </article>

                    <article className="card">
                        <div className="card-body">
                            <h3>Formularios</h3>
                            <p className="admin-numero">{contactos.length}</p>
                            <p>Formularios recibidos</p>
                        </div>
                    </article>
                </div>
            </section>

            <DataTable/>
            <ContactTable/>
            <ChartSection/>
        </>
    );
}
export default AdminPanel;
