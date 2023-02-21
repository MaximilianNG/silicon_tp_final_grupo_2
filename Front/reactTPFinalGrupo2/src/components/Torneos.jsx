import { Link } from 'react-router-dom'
import '../styles/torneos.css'
import { TorneoCard } from './TorneoCard'

export function Torneos() {
  return (
    <>
      <div className="containerCentrar">
            <button className='btn btn-success torneosButton'>Nuevo Torneo</button>
      </div>
        <div className="containerTorneos">
            <TorneoCard />
            <TorneoCard />
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning torneosButton'>Volver</button></Link>
        </div>
    </>
  )
}
