import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/admin.css'
<<<<<<< HEAD
=======
import { Juegos } from './Juegos'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> 4261e4be83ffbd8bc2119408a945409320a5c9fa

export function Admin() {
  //Estados
  const [problema, setProblema] = useState(false);

  //Effects
  useEffect(() => {
    const usuario = window.localStorage.getItem('usuario');
    const token = window.localStorage.getItem('token');
    if (usuario == null || usuario == undefined || token == null || token == undefined) {
      toast.error("Problema de autenticación, haga click en volver.", {
        toastId: "problema",
        autoClose: 6000
      });
      setProblema(true);
    }
  }, [])

  //Utilidades
  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
  }
  return (
      <>
<<<<<<< HEAD
        <div className="containerP">

        <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light" id="nav123">
        <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">
                <img src="imagenes/logo MC.png" alt="" width="70" height="70"><img/>
              </a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="btn ">
                <Link className="nav-link active text-light"  to={`/juegos`} aria-current="page" href="#">juegos</Link>
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
                <Link className="btn btn-danger active text-light "  to={`/`} aria-current="page" href="#">Salir</Link>
              </li>
    
            </ul>
          </div>
        </div>
      </nav>

    </header>
          


    

{/* ///////////////carrusel//////////////////////// */}


    {/* <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div className="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div className="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}


{/* ////////////////////FOOTER///////////////// */}



    {/* <footer className="text-center text-white" id="contacto">
        <div className="container pt-4">

          <section className="mb-4">
            <a class="navbar-brand" href="https://www.instagram.com/popeyepizza/?hl=es">
              <img src="imagenes/inst.png" alt="" width="45" height="45">
            </a>
            <a class="navbar-brand" href="#">
              <img src="imagenes/wapp.png" alt="" width="45" height="45">
            </a>
          </section>
          
        </div>
        
      
        
        <div className="text-center text-dark p-3" >
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
        
    </footer> */}
{/* 
=======
      {problema?
                <div className="containerCentrar">
                <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
            </div>:
            <></>}
        <div className={problema?`d-none`:`containerP`}>
>>>>>>> 4261e4be83ffbd8bc2119408a945409320a5c9fa
            <Link to={`/juegos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Juegos</button></Link>
            <Link to={`/jugadores`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Jugadores</button></Link>
            <Link to={`/torneos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Torneos</button></Link>
            <Link to={`/sponsors`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Sponsors</button></Link>
            <Link to={`/equipos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Equipos</button></Link> */}
            {/* <Link to={`/`} style={{ textDecoration: 'none' }}><button onClick={clearToken} className='btn btn-danger adminButton'>Salir</button></Link> */}
        </div>
      </>
  )
}
