import FormularioContacto from '../components/FormularioContacto.jsx'
import './Contacto.css'

function Contacto() {
  return (
    <div className="pagina">
      <h1>Contacto</h1>
      <p className="intro">Completá el formulario y te responderemos a la brevedad.</p>
      <div className="seccion-contacto">
        <FormularioContacto />
        <div className="mapa-contenedor">
          <iframe
            title="Ubicación en el mapa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-65.44%2C-24.81%2C-65.38%2C-24.77&layer=mapnik&marker=-24.7859%2C-65.4117"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default Contacto
