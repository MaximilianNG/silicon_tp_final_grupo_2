import { Link } from 'react-router-dom'
import '../styles/juegos.css'
import { JugadoresCard } from './JugadoresCard'

export function Jugadores() {
  return (
      <>
      <div className="containerCentrar">
            <button className='btn btn-success juegosButton'>Nuevo Jugador</button>
      </div>
        <div className="containerJuegos">
            <JugadoresCard />
            <JugadoresCard />
            <JugadoresCard />
            <JugadoresCard />
            <JugadoresCard />
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning juegosButton'>Volver</button></Link>
        </div>
      </>
  )
}