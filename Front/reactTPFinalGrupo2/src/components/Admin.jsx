import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/admin.css'
import { Juegos } from './Juegos'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <></>}
        <div className={problema?`d-none`:`containerP`}>
            <Link to={`/juegos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Juegos</button></Link>
            <Link to={`/jugadores`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Jugadores</button></Link>
            <Link to={`/torneos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Torneos</button></Link>
            <Link to={`/sponsors`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Sponsors</button></Link>
            <Link to={`/equipos`} style={{ textDecoration: 'none' }}><button className='btn btn-primary adminButton'>Equipos</button></Link>
            <Link to={`/`} style={{ textDecoration: 'none' }}><button onClick={clearToken} className='btn btn-danger adminButton'>Salir</button></Link>
        </div>
      </>
  )
}
