import { Link } from 'react-router-dom'
import '../styles/juegos.css'
import { JuegoCard } from './JuegoCard'
import * as API from '../services/juegosService'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Juegos() {
  //Estados del componente
  const [juegos, setJuegos] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  const [problema, setProblema] = useState(false);

  //Referencias del componente
  const nombre_juego = useRef();

  //Navigate
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    API.getJuegos().then((datos) => {
      if (datos.status == undefined) {
        setJuegos(datos);
      } else if (datos.status == false) {
        toast.error("Problema de autenticación, haga click en volver.", {
          toastId: "problema",
          autoClose: 6000
        });
        setProblema(true);
      }
    })
  }, [])

  //Utilidades
  function renderNuevoJuegoForm() {
    setNuevo(!nuevo);
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const nuevoJuego = async (e) => {
    e.preventDefault();
    const nombre = nombre_juego.current.value;
    const datos_enviar = {
      nombre: nombre
    };
    const respuesta = await API.nuevoJuego(datos_enviar);
    nombre_juego.current.value = "";
    respuesta.status?
    toast.success("El juego se creó exitosamente. Refrescando...", {
      toastId: "éxito",
      onClose: () => {
        navigate(0);
      }
    }):
    toast.warning("Hubo un error creando el juego.", {
      toastId: "error"
    });

  }

  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
    }


  return (
      <>
      {problema?
          <div className="containerCentrar">
              <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
          </div>
          :
      <></>}
      <div className="containerCentrar">
            <button onClick={() => renderNuevoJuegoForm()} 
            className={problema?`d-none`:`btn btn-success juegosButton`}>Nuevo Juego</button>
      </div>
      {nuevo?
      <form id="nuevoJuego" className={`containerNuevo ${animacion ? "mostrar" : ""}`}
            onSubmit={nuevoJuego}>
      <div>
        <label htmlFor="nombreJuego" className="form-label text-light mb-2">Nombre del juego</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" required
        aria-describedby="nombreJuego" ref={nombre_juego}/>
      </div>
      <button form="nuevoJuego" type="submit" className="btn btn-primary">Agregar</button>
    </form>
      :
      <></>}
      
        <div className="containerJuegos">
          {juegos.length >= 1?
          juegos.map((juego) => (
            <JuegoCard key={uuidv4()} nombre={`${juego.nombre}`} estado={`${juego.estado}`}
            id={`${juego.id}`}/>
          )):
          <p></p>}
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className={problema?`d-none`:`btn btn-warning juegosButton`}>Volver</button></Link>
        </div>
      </>
  )
}
