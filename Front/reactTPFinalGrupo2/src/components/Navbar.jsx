import React from 'react'
import { Link } from 'react-router-dom'
import logopestaña from '../../imagenes/logopestaña.png'
import '../styles/navbar.css'

const Navbar= () =>{


  //Utilidades
  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
  }

  return(
      <header className="header navContainer">
      <nav className="navbar navbar-expand-lg navbar-light" id="nav123">
      <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
              <img src={logopestaña} alt="" width="50" height="50"/>
          </Link>
        <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="btn ">
              <Link className="nav-link active text-light"  to={`/juegos`} aria-current="page" href="#">Juegos</Link>
            </li>

            <li className="btn ">
              <Link className="nav-link active text-light"  to={`/jugadores`} aria-current="page" href="#">Jugadores</Link>
            </li>
            <li className="btn ">
              <Link className="nav-link active text-light"  to={`/torneos`} aria-current="page" href="#">Torneos</Link>
            </li>
            <li className="btn ">
              <Link className="nav-link active text-light"  to={`/sponsors`} aria-current="page" href="#">Sponsors</Link>
            </li>
            <li className="btn ">
              <Link className="nav-link active text-light"  to={`/equipos`} aria-current="page" href="#">Equipos</Link>
            </li>

            <li className="btn ">
            <Link to={`/`}><button onClick={clearToken} className="btn btn-danger text-light">Salir</button></Link>
            </li>
  
          </ul>
        </div>
      </div>
    </nav>

  </header>
    )
}

export default Navbar
