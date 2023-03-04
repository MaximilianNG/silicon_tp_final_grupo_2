import { Link } from 'react-router-dom'
import '../styles/juegos.css'
import * as API from '../services/jugadoresService'
import { JugadoresCard } from './JugadoresCard'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Jugadores() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    API.getJugadores().then(setJugadores)
  }, [])
  return (
      <>
      <div className="containerCentrar">
            <button className='btn btn-success juegosButton'>Nuevo Jugador</button>
      </div>
      <div className="containerJuegos">
          {jugadores.map((jugador) => (
            <JugadoresCard key={uuidv4()} nombre={`${jugador.nombre}`} apellido={`${jugador.apellido}`} apodo={`${jugador.nombre_profesional}`} email={`${jugador.email}`} equipo={`${jugador.equipo}`} localidad={`${jugador.localidad}`} estado={`${jugador.estado}`}
            id={`${jugador.id}`}/>
          ))}
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning juegosButton'>Volver</button></Link>
        </div>
      </>
  )
}