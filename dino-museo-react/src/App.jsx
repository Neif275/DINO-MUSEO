import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Inicio from './components/Inicio'
import Dinos from './components/Dinos'
import DinoDetalle from './components/DinoDetalle'
import Horarios from './components/Horarios'
import ContactForm from './components/ContactForm'
import LoginForm from './components/LoginForm.jsx'
import RegistroForm from './components/RegistroForm'
import AdminPanel from './components/AdminPanel'
import EditDinoForm from './components/EditDinoForm'
import ContactDetail from './components/ContactDetail'
import RutaProtegida from './components/RutaProtegida'
import SinAcceso from './components/SinAcceso'
import Tienda from './components/Tienda'
import EntradasAdmin from './components/EntradasAdmin'
import EntradaForm from './components/EntradaForm'
import EntradaDetalle from './components/EntradaDetalle'
import BoletasAdmin from './components/BoletasAdmin'
import BoletaDetalle from './components/BoletaDetalle'
import './App.css'

// Roles que pueden entrar a cada grupo de paginas
const ADMIN = ['ADMIN'];
const PANEL = ['ADMIN', 'VENDEDOR'];
const TIENDA = ['CLIENTE', 'ADMIN'];

function App() {
  return (
    <>
      <NavBar/>
      <main>
        <Routes>
          {/* sitio publico */}
          <Route path="/" element={<Inicio/>}/>
          <Route path="/exposicion" element={<Dinos/>}/>
          <Route path="/exposicion/:id" element={<DinoDetalle/>}/>
          <Route path="/horarios" element={<Horarios/>}/>
          <Route path="/contacto" element={<ContactForm/>}/>
          <Route path="/admin/login" element={<LoginForm/>}/>
          <Route path="/registro" element={<RegistroForm/>}/>
          <Route path="/sin-acceso" element={<SinAcceso/>}/>

          {/* tienda: cliente */}
          <Route path="/tienda" element={<RutaProtegida roles={TIENDA}><Tienda/></RutaProtegida>}/>

          {/* panel: administrador y vendedor */}
          <Route path="/admin" element={<RutaProtegida roles={PANEL}><AdminPanel/></RutaProtegida>}/>
          <Route path="/admin/entradas" element={<RutaProtegida roles={PANEL}><EntradasAdmin/></RutaProtegida>}/>
          <Route path="/admin/entradas/:id" element={<RutaProtegida roles={PANEL}><EntradaDetalle/></RutaProtegida>}/>
          <Route path="/admin/boletas" element={<RutaProtegida roles={PANEL}><BoletasAdmin/></RutaProtegida>}/>
          <Route path="/admin/boletas/:id" element={<RutaProtegida roles={PANEL}><BoletaDetalle/></RutaProtegida>}/>

          {/* solo administrador */}
          <Route path="/admin/entradas/nueva" element={<RutaProtegida roles={ADMIN}><EntradaForm/></RutaProtegida>}/>
          <Route path="/admin/entradas/:id/editar" element={<RutaProtegida roles={ADMIN}><EntradaForm/></RutaProtegida>}/>
          <Route path="/admin/editar/:id" element={<RutaProtegida roles={ADMIN}><EditDinoForm/></RutaProtegida>}/>
          <Route path="/admin/contacto" element={<RutaProtegida roles={ADMIN}><ContactDetail/></RutaProtegida>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
