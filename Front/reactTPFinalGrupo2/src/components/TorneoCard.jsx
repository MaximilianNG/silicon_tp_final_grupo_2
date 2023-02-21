import '../styles/torneoCard.css'

export function TorneoCard() {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Nombre del torneo</h5>
            <p className="card-text">Primer puesto: equipo</p>
            <p className="card-text">Segundo puesto: equipo</p>
            <p className="card-text">Tercer puesto: equipo</p>
        </div>
        <div className="cardBotonesContainer">
            <a href="#" className="btn btn-primary">Editar</a>
            <a href="#" className="btn btn-danger">Dar de baja</a>
        </div>
    </div>
  )
}
