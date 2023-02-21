import '../styles/juegoCard.css'

export function JugadoresCard() {
  return (
    <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Nombre</h5>
                <h5 className="card-title">Apellido</h5>
                <h5 className="card-title">Apodo</h5>
                <h5 className="card-title">Email</h5>
                <h5 className="card-title">Localidad</h5>
                <h5 className="card-title">Equipo</h5>
                <h5 className="card-title">Estado</h5>
                <div className="cardBotonesContainer">
                    <a href="#" className="btn btn-primary">Editar</a>
                    <a href="#" className="btn btn-danger">Dar de baja</a>
                </div>
            </div>
        </div>
    </>
  )
}