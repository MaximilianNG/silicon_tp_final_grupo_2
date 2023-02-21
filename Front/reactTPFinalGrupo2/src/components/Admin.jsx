import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/admin.css'
import { Juegos } from './Juegos'

export function Admin() {
  return (
      <>
        <div className="containerP">
            <Link to={`/juegos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Juegos</button></Link>
            <Link to={`/jugadores`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Jugadores</button></Link>
            <Link to={`/torneos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Torneos</button></Link>
            <Link to={`/sponsors`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Sponsors</button></Link>
            <Link to={`/equipos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Equipos</button></Link>
            <Link to={`/`} style={{ textDecoration: 'none' }}><button className='btn btn-danger adminButton'>Salir</button></Link>
        </div>
      </>
  )
}
