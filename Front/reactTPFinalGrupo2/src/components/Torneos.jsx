import { Link } from 'react-router-dom'
import '../styles/torneos.css'
import { TorneoCard } from './TorneoCard'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/torneosService'
import * as APIJuegos from '../services/juegosService'
import * as APIEquipos from '../services/equiposService'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Navbar  from './Navbar'
import  Footer  from './Footer'

export function Torneos() {
  //Navigate
  const navigate = useNavigate();

  //Estados
  const [torneos, setTorneos] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [problema, setProblema] = useState(false);

  //Referencias
  const nombre = useRef();
  const fecha = useRef();
  const id_juego = useRef();
  const id_localidad = useRef();
  const id_primerPuesto = useRef();
  const id_segundoPuesto = useRef();
  const id_tercerPuesto = useRef();

  //Effect
  useEffect(() => {
    API.getTorneos().then((datos) => {
      if (datos.status == undefined) {
        setTorneos(datos);
      } else if (datos.status == false) {
        toast.error("Problema de autenticación, haga click en volver.", {
          toastId: "problema",
          autoClose: 6000
        });
        setProblema(true);
      }
    });
    APIJuegos.getJuegos().then(setJuegos);
    APIEquipos.getEquipos().then(setEquipos);
  }, [])

  //Utilidades
  const nuevoTorneo = async (e) => {
    e.preventDefault();
    let control = false;
    const datos_enviar = {
      nombre: nombre.current.value,
      fecha: fecha.current.value,
      id_juego: id_juego.current.value,
      id_localidad: id_localidad.current.value,
      id_primerPuesto: id_primerPuesto.current.value,
      id_segundoPuesto: id_segundoPuesto.current.value,
      id_tercerPuesto: id_tercerPuesto.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      toast.warning("Debe completar el formulario para mandarlo.", {
        toastId: "error"
      })
      return
    } else {
      const respuesta = await API.nuevoTorneo(datos_enviar);
      respuesta.status?
      toast.success("El torneo se creó exitosamente. Refrescando...", {
        toastId: "éxito",
        onClose: () => {
          navigate(0);
        }
      }):
      toast.warning("Hubo un error creando el torneo.", {
        toastId: "error"
      })
    }

  }

  function renderNuevoTorneoForm() {
    setNuevo(!nuevo);
  }

  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
    }

  return (
    <>
      <Navbar/>
      <div className='fond'>
      {problema?
      <div className="containerCentrar">
        <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
      </div>:
      <></>}
      <div className={problema?"d-none":"containerCentrar"}>
            <button onClick={() => renderNuevoTorneoForm()} 
            className='btn btn-success torneosButton'>Crear Torneo</button>
      </div>

      {nuevo?
          <form id="nuevoTorneo" className={`containerNuevoTorneo`} onSubmit={(e) => nuevoTorneo(e)}>
          <div>
            <label htmlFor="nombreTorneo" className="form-label text-light mb-2">Nombre</label>
            <input required type="text" className="form-control mb-3" id="nombreTorneo" 
            aria-describedby="nombre del torneo" ref={nombre}/>

            <label htmlFor="fechaTorneo" className="form-label text-light mb-2">Fecha</label>
            <input required type="date" className="form-control mb-3" id="fechaTorneo" 
            aria-describedby="fecha del torneo" ref={fecha}/>

            <label htmlFor="juegoTorneo" className="form-label text-light mb-2">Juego del torneo</label>
            <select required className="form-select" aria-label="Juegos activos para elegir" ref={id_juego}>
              <option className="dropdown-item" value="0">Elija un juego</option>
              {juegos.map((juego) => {
                if (juego.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                  )
                }
                })}
            </select>

            <label htmlFor="localidadTorneo" className="form-label text-light mb-2 mt-4">Localidad del torneo</label>
            <select required className="form-select" aria-label="Elegir localidad del torneo" ref={id_localidad}>
              <option className="dropdown-item" value="0">Elija una localidad</option>
              <option className="dropdown-item" value="1">Posadas</option>
              <option className="dropdown-item" value="2">Garupá</option>
              <option className="dropdown-item" value="3">Fachinal</option>
              <option className="dropdown-item" value="4">Capioví</option>
              <option className="dropdown-item" value="5">Puerto Rico</option>
              <option className="dropdown-item" value="6">Garuhapé</option>
              <option className="dropdown-item" value="7">Oberá</option>
              <option className="dropdown-item" value="8">Los Helechos</option>
              <option className="dropdown-item" value="9">Campo Viera</option>
              <option className="dropdown-item" value="10">Puerto Esperanza</option>
              <option className="dropdown-item" value="11">Puerto Iguazú</option>
              <option className="dropdown-item" value="12">Puerto Libertad</option>
            </select>

            <label htmlFor="primerPuesto" className="form-label text-light mb-2 mt-4">Primer puesto</label>
            <select required className="form-select" aria-label="Equipos activos para elegir primer puesto" ref={id_primerPuesto}>
              <option className="dropdown-item" value="0">Elija el equipo del primer puesto</option>
              {equipos.map((equipo) => {
                if (equipo.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                  )
                }
                })}
            </select>

            <label htmlFor="segundoPuesto" className="form-label text-light mb-2 mt-4">Segundo puesto</label>
            <select required className="form-select" aria-label="Equipos activos para elegir segundo puesto" ref={id_segundoPuesto}>
              <option className="dropdown-item" value="0">Elija el equipo del segundo puesto</option>
              {equipos.map((equipo) => {
                if (equipo.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                  )
                }
                })}
            </select>

            <label htmlFor="tercerPuesto" className="form-label text-light mb-2 mt-4">Tercer puesto</label>
            <select required className="form-select" aria-label="Equipos activos para elegir tercer puesto" ref={id_tercerPuesto}>
              <option className="dropdown-item" value="0">Elija el equipo del tercer puesto</option>
              {equipos.map((equipo) => {
                if (equipo.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                  )
                }
                })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-5">Agregar</button>
        </form>
          :<></>}

        <div className="containerTorneos">
          {torneos.map((torneo) => (
            <TorneoCard key={uuidv4()} juego={torneo.juego} localidad={torneo.localidad} 
            fecha={torneo.fecha} id={torneo.id} nombre={torneo.nombre} estado={torneo.estado} primero={torneo.id_primerPuesto} 
            segundo={torneo.id_segundoPuesto} tercero={torneo.id_tercerPuesto} equipos={equipos} juegos={juegos}/>
          ))}
        </div>
        <div className={problema?"d-none":"containerCentrar"}>
            <Link to={`/admin`}><button className='btn btn-warning torneosButton'>Volver</button></Link>
        </div>
      </div>
      <Footer/>     
    </>
  )
}
