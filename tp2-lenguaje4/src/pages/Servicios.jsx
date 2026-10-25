import tecnologias from '../data/tecnologias.js'
import './Servicios.css'

function Servicios() {
  return (
    <div className="pagina">
      <h1>Servicios</h1>
      <p className="intro">
        Tecnologías y herramientas que utilizamos en nuestros proyectos de desarrollo.
      </p>
      <div className="grilla-tecnologias">
        {tecnologias.map((tecnologia) => (
          <div className="tarjeta-tecnologia" key={tecnologia.id}>
            <img src={tecnologia.imagen} alt={tecnologia.nombre} />
            <h2>{tecnologia.nombre}</h2>
            <span className="etiqueta">{tecnologia.categoria}</span>
            <span className="nivel">Nivel: {tecnologia.nivel}</span>
            <p>{tecnologia.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Servicios
