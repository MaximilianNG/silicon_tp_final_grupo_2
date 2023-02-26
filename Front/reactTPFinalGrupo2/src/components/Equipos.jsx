import { Link } from 'react-router-dom'
import '../styles/equipos.css'
import { EquipoCard } from './EquipoCard.jsx'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/equiposService'
import * as APIJuegos from '../services/juegosService'
import { v4 as uuidv4 } from 'uuid'

export function Equipos() {
  //Estados
  const [equipos, setEquipos] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [animacion, setAnimacion] = useState(false);

  //Referencias
  const nombre_equipo = useRef();
  const juego_equipo = useRef();

  //Effects
  useEffect(() => {
    API.getEquipos().then(setEquipos);
    APIJuegos.getJuegos().then(setJuegos);
  }, [])

  //Utilidades
  function renderNuevoEquipoForm() {
    setNuevo(!nuevo);
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const nuevoEquipo = async () => {
    const nombre = nombre_equipo.current.value;
    const id_juego = juego_equipo.current.value;
    const datos_enviar = {
      nombre: nombre,
      id_juego: id_juego
    };
    const respuesta = await API.nuevoEquipo(datos_enviar);
    nombre_equipo.current.value = "";
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
  }


  return (
    <>
        <div className="containerCentrar">
            <button onClick={() => renderNuevoEquipoForm()} className='btn btn-success equiposButton'>Nuevo Equipo</button>
        </div>

        {nuevo?
          <form className={`containerNuevo ${animacion ? "mostrar" : ""}`}>
          <div>
            <label htmlFor="nombreEquipo" className="form-label text-light mb-2">Nombre del equipo</label>
            <input type="text" className="form-control mb-3" id="nombreEquipo" 
            aria-describedby="nombreEquipo" ref={nombre_equipo}/>

            <label htmlFor="juegoEquipo" className="form-label text-light mb-2">Juego del equipo</label>
            <select className="form-select" aria-label="Juegos activos para elegir" ref={juego_equipo}>
              <option className="dropdown-item" value="0">Elija un juego</option>
              {juegos.map((juego) => {
                if (juego.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                  )
                }
                })}
            </select>
          </div>
          <button onClick={() => {nuevoEquipo()}} type="button" className="btn btn-primary mt-5">Agregar</button>
        </form>
          :<></>}

        <div className="containerEquipos">
          {equipos.map((equipo) => (
            <EquipoCard key={uuidv4()} nombre={`${equipo.nombre}`} estado={`${equipo.estado}`}
            id={`${equipo.id}`} juego={`${equipo.juego}`}/>
          ))}
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning equiposButton'>Volver</button></Link>
        </div>
      </>
  )
}