import { Link } from 'react-router-dom'
import '../styles/jugadores.css'
import * as API from '../services/jugadoresService'
import * as APIEquipos from '../services/equiposService'
import { JugadoresCard } from './JugadoresCard'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from './Navbar'


export function Jugadores() {
  //Navigate
  const navigate = useNavigate();

  //Estados
  const [jugadores, setJugadores] = useState([]);
  const [equiposT, setEquiposT] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [problema, setProblema] = useState(false);

  //Referencias
  const nombre = useRef();
  const apellido = useRef();
  const nombre_profesional = useRef();
  const email = useRef();
  const id_localidad = useRef();
  const id_equipo = useRef();

  //Effects
  useEffect(() => {
    API.getJugadores().then((datos) => {
      if (datos.status == undefined) {
        setJugadores(datos);
      } else if (datos.status == false) {
        toast.error("Problema de autenticación, haga click en volver.", {
          toastId: "problema",
          autoClose: 6000
        });
        setProblema(true);
      }
    })
    APIEquipos.getEquipos().then(setEquiposT);
  }, [])


  //Utilidades
  function renderNuevoJugadorForm() {
    setNuevo(!nuevo);
  }

  const nuevoJugador = async (e) => {
    e.preventDefault()
    let control = false;
    const datos_enviar = {
      nombre: nombre.current.value,
      apellido: apellido.current.value,
      nombre_profesional: nombre_profesional.current.value,
      email: email.current.value,
      id_localidad: id_localidad.current.value,
      id_equipo: id_equipo.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0") {
        control = true;
      }
    }

    if (control) {
      toast.warning("Por favor complete todos los campos.", {
        toastId: "error"
      });
      return false

    } else {
      const respuesta = await API.nuevoJugador(datos_enviar);
      respuesta.status?
    toast.success("El jugador se creó exitosamente. Refrescando...", {
      toastId: "éxito",
      onClose: () => {
        navigate(0);
      }
    }):
    toast.warning("Hubo un error creando el jugador.", {
      toastId: "error"
    });
    }

  }

  function renderNuevoJugadorForm() {
    setNuevo(!nuevo);
  }

  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
  }

  return (
    <>
      <Navbar/>
      {problema?
          <div className="containerCentrar">
              <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
          </div>
          :
      <></>}

      <div className={problema?"d-none":"containerCentrar"}>
          <button onClick={() => renderNuevoJugadorForm()} 
          className='btn btn-success juegosButton'>Crear jugador</button>
          <Link to={`/admin`}><button className='btn btn-warning jugadoresButton'>Volver</button></Link>
      </div>

  {nuevo?
    <form id="nuevoJugador" onSubmit={(e) => nuevoJugador(e)} className='containerNuevoJugador'>
      <div>
        <label htmlFor="nombreJugador" className="form-label text-light mb-2">Nombre</label>
        <input required type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="nombreJugador" ref={nombre}/>
      </div>
      <div>
        <label htmlFor="apellidoJugador" className="form-label text-light mb-2">Apellido</label>
        <input required type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="apellidoJugador" ref={apellido}/>
      </div>
      <div>
        <label htmlFor="nombre_profesional" className="form-label text-light mb-2">Apodo</label>
        <input required type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="nombre_profesional" ref={nombre_profesional}/>
      </div>
      <div>
        <label htmlFor="emailJugador" className="form-label text-light mb-2">Email</label>
        <input required type="email" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="emailJugador" ref={email}/>
      </div>
      <label htmlFor="localidadJugador" className="form-label text-light mb-2 ">Localidad del jugador</label>
            <select className="form-select" aria-label="Elegir localidad del torneo" ref={id_localidad}>
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

      <label htmlFor="equipoJugador" className="form-label text-light mb-2 mt-3">Equipo del jugador</label>
            <select className="form-select" aria-label="Elegir equipo del jugador" ref={id_equipo}>
              <option className="dropdown-item" value="0">Elija un equipo</option>
              {equiposT.map((equipo) => {
                    if (equipo.estado != 0) {
                      return (
                        <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                      )
                    }
                    })}
            </select>
      
      
      <button form="nuevoJugador" type="submit" className="btn btn-primary mt-3">Crear</button>
    </form>
      :
      <></>}



      <div className="containerJugadores">
        <div className="container">
          <div className="row gy-3">
          {jugadores.map((jugador) => (
              <JugadoresCard key={uuidv4()} nombre={jugador.nombre} apellido={jugador.apellido} nombre_profesional={jugador.nombre_profesional}
              equipo={jugador.equipo} estado={jugador.estado} equiposT={equiposT} 
              email={jugador.email} localidad={jugador.localidad} id={jugador.id}/>
            )) }
          </div>
        </div>

        </div>
    </>
  )
}