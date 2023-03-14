import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/admin.css'
import '../styles/footer.css'
import { Juegos } from './Juegos'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Navbar  from './Navbar'
import  Footer  from './Footer'

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
      {problema?
        <div className="containerCentrar">
          <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
        </div>:
      <>
      <Navbar/>
      <div className="d-flex flex-column justify-content-center centrarCarrusel">
        <div className="carruselContainer mt-auto">
          <div id="carruselJuegos" className="carousel carousel-fade" data-bs-ride="carousel" data-bs-pause="hover">
            <div className="carousel-inner">
              <div className="carousel-item" data-bs-interval="4000">
                <img src="https://images7.alphacoders.com/673/673384.jpg" className="d-block carruselImagen" alt="..."/>
              </div>
              <div className="carousel-item" data-bs-interval="4000">
                <img src="https://images3.alphacoders.com/602/602045.jpg" className="d-block carruselImagen" alt="..."/>
              </div>
              <div className="carousel-item active" data-bs-interval="4000">
                <img src="https://images7.alphacoders.com/108/1081001.jpg" className="d-block carruselImagen" alt="..."/>
              </div>
              <div className="carousel-item" data-bs-interval="4000">
                <img src="https://images7.alphacoders.com/129/1293484.jpg" className="d-block carruselImagen" alt="..."/>
              </div>
            </div>
          </div>
        </div>
          
      </div>

        </>}
        
      </>
  )
}
