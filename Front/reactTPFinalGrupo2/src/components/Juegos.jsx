import { Link } from 'react-router-dom'
import '../styles/juegos.css'
import { JuegoCard } from './JuegoCard'

export function Juegos() {
  return (
      <>
      <div className="containerCentrar">
            <button className='btn btn-success juegosButton'>Nuevo Juego</button>
      </div>
        <div className="containerJuegos">
            <JuegoCard />
            <JuegoCard />
            <JuegoCard />
            <JuegoCard />
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning juegosButton'>Volver</button></Link>
        </div>
      </>
  )
}
