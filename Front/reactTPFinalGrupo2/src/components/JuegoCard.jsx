import '../styles/juegoCard.css'

export function JuegoCard() {
  return (
    <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Nombre del juego</h5>
                <div className="cardBotonesContainer">
                    <a href="#" className="btn btn-primary">Editar</a>
                    <a href="#" className="btn btn-danger">Dar de baja</a>
                </div>
            </div>
        </div>
    </>
  )
}
