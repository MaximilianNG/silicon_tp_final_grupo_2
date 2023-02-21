import '../styles/sponsorCard.css'

export function SponsorCard() {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Nombre del sponsor</h5>
            <p className="card-text">Equipo/s sponsoreados: equipo o lista de equipos</p>
            <p className="card-text">Torneo/s sponsoreados: torneo o lista de torneos</p>
        </div>
        <div className="cardBotonesContainer">
            <a href="#" className="btn btn-primary">Editar</a>
            <a href="#" className="btn btn-danger">Dar de baja</a>
        </div>
    </div>
  )
}