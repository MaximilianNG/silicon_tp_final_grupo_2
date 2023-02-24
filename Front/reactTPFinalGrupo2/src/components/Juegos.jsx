import { Link } from 'react-router-dom'
import '../styles/juegos.css'
import { JuegoCard } from './JuegoCard'
import * as API from '../services/juegosService'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Juegos() {
  //Estados del componente
  const [juegos, setJuegos] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [animacion, setAnimacion] = useState(false);

  //Referencias del componente
  const nombre_juego = useRef();

  useEffect(() => {
    API.getJuegos().then(setJuegos);
  }, [])

  function renderNuevoJuegoForm() {
    setNuevo(!nuevo);
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const nuevoJuego = async () => {
    const nombre = nombre_juego.current.value;
    const datos_enviar = {
      nombre: nombre
    };
    const respuesta = await API.nuevoJuego(datos_enviar);
    nombre_juego.current.value = "";
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
  }

  return (
      <>
      <div className="containerCentrar">
            <button onClick={() => renderNuevoJuegoForm()} 
            className='btn btn-success juegosButton'>Nuevo Juego</button>
      </div>
      {nuevo?
      <form className={`containerNuevo ${animacion ? "mostrar" : ""}`}>
      <div>
        <label htmlFor="nombreJuego" className="form-label text-light mb-2">Nombre del juego</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="nombreJuego" ref={nombre_juego}/>
      </div>
      <button onClick={nuevoJuego} type="button" className="btn btn-primary">Agregar</button>
    </form>
      :
      <></>}
        <div className="containerJuegos">
          {juegos.map((juego) => (
            <JuegoCard key={uuidv4()} name={`${juego.nombre}`} estado={`${juego.estado}`}
            id={`${juego.id}`}/>
          ))}
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning juegosButton'>Volver</button></Link>
        </div>
      </>
  )
}
