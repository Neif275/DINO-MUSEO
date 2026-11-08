import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Inicio from './components/Inicio'
import Dinos from './components/Dinos'
import DinoDetalle from './components/DinoDetalle'
import Horarios from './components/Horarios'
import ContactForm from './components/ContactForm'
import LoginForm from './components/LoginForm.jsx'
import AdminPanel from './components/AdminPanel'
import EditDinoForm from './components/EditDinoForm'
import ContactDetail from './components/ContactDetail'
import './App.css'


function App() {
  return (
    <>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/exposicion" element={<Dinos/>}/>
          <Route path="/exposicion/:id" element={<DinoDetalle/>}/>
          <Route path="/horarios" element={<Horarios/>}/>
          <Route path="/contacto" element={<ContactForm/>}/>
          <Route path="/admin/login" element={<LoginForm/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/admin/editar/:id" element={<EditDinoForm/>}/>
          <Route path="/admin/contacto" element={<ContactDetail/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App