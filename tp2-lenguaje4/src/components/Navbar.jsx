import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="marca">TP2 · Lenguaje IV</div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'activo' : ''}>
          Inicio
        </NavLink>
        <NavLink to="/servicios" className={({ isActive }) => isActive ? 'activo' : ''}>
          Servicios
        </NavLink>
        <NavLink to="/contacto" className={({ isActive }) => isActive ? 'activo' : ''}>
          Contacto
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
