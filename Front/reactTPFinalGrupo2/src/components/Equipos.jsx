import { Link } from 'react-router-dom'
import '../styles/equipos.css'
import { MostrarEquipos } from './MostrarEquipos.jsx'

export function Equipos() {
  return (
      <>
        <div className="containerCentrar">
            <button className='btn btn-success equiposButton'>Nuevo Equipo</button>
        </div>

        <div className="containerEquipos">
            <MostrarEquipos/>

        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning equiposButton'>Volver</button></Link>
        </div>
      </>
  )
}