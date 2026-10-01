import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../emailConfig.js'
import './FormularioContacto.css'

const MAX_MENSAJE = 300

const valoresIniciales = {
  nombre: '',
  email: '',
  mensaje: '',
}

function validarCampo(campo, valor) {
  if (campo === 'nombre') {
    if (!valor.trim()) return 'Ingresá tu nombre y apellido.'
    if (valor.trim().length < 3) return 'El nombre es demasiado corto.'
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(valor)) return 'El nombre solo puede contener letras y espacios.'
    return ''
  }

  if (campo === 'email') {
    if (!valor.trim()) return 'Ingresá tu correo electrónico.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Ingresá un correo electrónico válido.'
    return ''
  }

  if (campo === 'mensaje') {
    if (!valor.trim()) return 'Escribí un mensaje.'
    if (valor.length > MAX_MENSAJE) return `El mensaje no puede superar los ${MAX_MENSAJE} caracteres.`
    return ''
  }

  return ''
}

function FormularioContacto() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [estado, setEstado] = useState(null)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
    setErrores((anteriores) => ({ ...anteriores, [name]: validarCampo(name, value) }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    const erroresActuales = {
      nombre: validarCampo('nombre', valores.nombre),
      email: validarCampo('email', valores.email),
      mensaje: validarCampo('mensaje', valores.mensaje),
    }
    setErrores(erroresActuales)

    const hayErrores = Object.values(erroresActuales).some((error) => error !== '')
    if (hayErrores) return

    setEnviando(true)
    setEstado(null)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre: valores.nombre,
          email: valores.email,
          mensaje: valores.mensaje,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setEstado('exito')
      setValores(valoresIniciales)
      setErrores({})
    } catch (error) {
      setEstado('error')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario-contacto" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={valores.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          value={valores.email}
          onChange={manejarCambio}
        />
        {errores.email && <span className="error">{errores.email}</span>}
      </div>

      <div className="campo">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          maxLength={MAX_MENSAJE}
          value={valores.mensaje}
          onChange={manejarCambio}
        />
        <span className="contador">{valores.mensaje.length}/{MAX_MENSAJE}</span>
        {errores.mensaje && <span className="error">{errores.mensaje}</span>}
      </div>

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {estado === 'exito' && <p className="mensaje-estado exito">Tu mensaje se envió correctamente.</p>}
      {estado === 'error' && <p className="mensaje-estado error-estado">Ocurrió un error al enviar el mensaje. Intentá de nuevo.</p>}
    </form>
  )
}

export default FormularioContacto
