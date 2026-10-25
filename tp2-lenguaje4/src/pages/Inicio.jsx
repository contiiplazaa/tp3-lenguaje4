import { useEffect, useState } from 'react'
import './Inicio.css'

function Inicio() {
  const [repositorios, setRepositorios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=8')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error en la respuesta')
        return respuesta.json()
      })
      .then((datos) => {
        setRepositorios(datos.items || [])
        setCargando(false)
      })
      .catch(() => {
        setError(true)
        setCargando(false)
      })
  }, [])

  return (
    <div className="pagina">
      <h1>Inicio</h1>
      <p className="intro">
        Repositorios de JavaScript más destacados de GitHub, obtenidos en tiempo real desde la API pública de GitHub.
      </p>

      {cargando && <p className="estado-carga">Cargando repositorios...</p>}
      {error && <p className="estado-carga">No se pudieron cargar los datos. Intentá de nuevo más tarde.</p>}

      <div className="grilla-repositorios">
        {repositorios.map((repositorio) => (
          <div className="tarjeta-repositorio" key={repositorio.id}>
            <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
            <h2>{repositorio.name}</h2>
            <p className="descripcion">{repositorio.description || 'Sin descripción disponible.'}</p>
            <div className="datos-repositorio">
              <span>⭐ {repositorio.stargazers_count}</span>
              <span>🍴 {repositorio.forks_count}</span>
              <span>👤 {repositorio.owner.login}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inicio
