import { Link } from 'react-router-dom'
import '../styles/equipos.css'
import { EquipoCard } from './EquipoCard.jsx'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/equiposService'
import * as APIJuegos from '../services/juegosService'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export function Equipos() {
  //Navigate
  const navigate = useNavigate();

  //Estados
  const [equipos, setEquipos] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  const [problema, setProblema] = useState(false);

  //Referencias
  const nombre_equipo = useRef();
  const juego_equipo = useRef();

  //Effects
  useEffect(() => {
    API.getEquipos().then((datos) => {
      if (datos.status == undefined) {
        setEquipos(datos);
      } else if (datos.status == false) {
        toast.error("Problema de autenticación, haga click en volver.", {
          toastId: "problema",
          autoClose: 6000
        });
        setProblema(true);
      }
    });
    APIJuegos.getJuegos().then(setJuegos);
  }, [])

  //Utilidades
  function renderNuevoEquipoForm() {
    setNuevo(!nuevo);
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const nuevoEquipo = async (e) => {
    e.preventDefault()
    const nombre = nombre_equipo.current.value;
    const id_juego = juego_equipo.current.value;
    if (nombre == "") {
      toast.warning("Ingrese un nombre por favor.", {
        toastId: "error"
      });
      return false
    }
    const datos_enviar = {
      nombre: nombre,
      id_juego: id_juego
    };
    const respuesta = await API.nuevoEquipo(datos_enviar);
    nombre_equipo.current.value = "";
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
      </div>:
      <></>}

        <div className={problema?"d-none":"containerCentrar"}>
            <button onClick={() => renderNuevoEquipoForm()} className='btn btn-success equiposButton'>Nuevo Equipo</button>
        </div>

        {nuevo?
          <form id="nuevoEquipo" onSubmit={(e) => nuevoEquipo(e)} className={`containerNuevo ${animacion ? "mostrar" : ""}`}>
          <div>
            <label htmlFor="nombreEquipo" className="form-label text-light mb-2">Nombre del equipo</label>
            <input type="text" className="form-control mb-3" id="nombreEquipo" 
            aria-describedby="nombreEquipo" ref={nombre_equipo}/>

            <label htmlFor="juegoEquipo" className="form-label text-light mb-2">Juego del equipo</label>
            <select className="form-select" aria-label="Juegos activos para elegir" ref={juego_equipo}>
              <option className="dropdown-item" value="0">Elija un juego</option>
              {juegos.map((juego) => {
                if (juego.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                  )
                }
                })}
            </select>
          </div>
          <button form="nuevoEquipo" type="submit" className="btn btn-primary mt-5">Agregar</button>
        </form>
          :<></>}

        <div className="containerEquipos">
          {equipos.map((equipo) => (
            <EquipoCard key={uuidv4()} nombre={`${equipo.nombre}`} estado={`${equipo.estado}`}
            id={`${equipo.id}`} juego={`${equipo.juego}`}/>
          ))}
        </div>
        <div className={problema?"d-none":"containerCentrar"}>
            <Link to={`/admin`}><button className='btn btn-warning equiposButton'>Volver</button></Link>
        </div>
      </>
  )
}