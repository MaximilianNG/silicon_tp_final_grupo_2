import { Link } from 'react-router-dom'
import '../styles/sponsors.css'
import { SponsorCard } from './SponsorCard'

export function Sponsors() {
  return (
      <>
      <div className="containerCentrar">
            <button className='btn btn-success juegosButton'>Nuevo Sponsor</button>
      </div>
        <div className="containerSponsors">
            <SponsorCard />
            <SponsorCard />
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning sponsorsButton'>Volver</button></Link>
        </div>
      </>
  )
}
