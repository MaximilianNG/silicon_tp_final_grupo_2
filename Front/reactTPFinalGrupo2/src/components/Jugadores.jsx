import { Link } from 'react-router-dom'
import '../styles/jugadores.css'
import * as API from '../services/jugadoresService'
import { JugadoresCard } from './JugadoresCard'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [animacion, setAnimacion] = useState(false);

  //Referencias
  const nombre = useRef();
  const apellido = useRef();
  const nombre_profesional = useRef();
  const email = useRef();
  const id_localidad = useRef();
  const id_equipo = useRef();

  useEffect(() => {
    API.getJugadores().then(setJugadores)
  }, [])


  //Utilidades
  function renderNuevoJugadorForm() {
    setNuevo(!nuevo);
    // setTimeout(()=>{
    //   setAnimacion(!animacion)
    // }, 10);
  }

  const nuevoJugador = async () => {
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
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await API.nuevoJugador(datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }

  }

  function renderNuevoJugadorForm() {
    setNuevo(!nuevo);
  }

  return (
    <>
      <div className="containerCentrarJugadores">
            <button onClick={() => renderNuevoJugadorForm()} className='btn btn-success juegosButton'>Nuevo Jugador</button>
      </div>


  {nuevo?
    <form className='containerNuevoJugador'>
      <div>
        <label htmlFor="nombreJugador" className="form-label text-light mb-2">Nombre</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="nombreJugador" ref={nombre}/>
      </div>
      <div>
        <label htmlFor="apellidoJugador" className="form-label text-light mb-2">Apellido</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="apellidoJugador" ref={apellido}/>
      </div>
      <div>
        <label htmlFor="nombre_profesional" className="form-label text-light mb-2">Apodo</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" 
        aria-describedby="nombre_profesional" ref={nombre_profesional}/>
      </div>
      <div>
        <label htmlFor="emailJugador" className="form-label text-light mb-2">Email</label>
        <input type="text" className="form-control mb-3" id="nombreJuego" 
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
              <option className="dropdown-item" value="1">Banzai</option>
              <option className="dropdown-item" value="2">Crimson</option>
              <option className="dropdown-item" value="3">Toxic</option>
              <option className="dropdown-item" value="4">Gecko</option>
              <option className="dropdown-item" value="5">Horad</option>
              <option className="dropdown-item" value="6">Wasps</option>
              <option className="dropdown-item" value="7">Silver</option>
              <option className="dropdown-item" value="8">Kamikaze</option>
              <option className="dropdown-item" value="9">Delta</option>
            </select>
      
      
      <button onClick={nuevoJugador} type="button" className="btn btn-primary">Agregar</button>
    </form>
      :
      <></>}



      <div className="containerJugadores">
          {jugadores.map((jugador) => (
            <JugadoresCard key={uuidv4()} nombre={`${jugador.nombre}`} apellido={`${jugador.apellido}`} apodo={`${jugador.nombre_profesional}`} email={`${jugador.email}`} equipo={`${jugador.equipo}`} localidad={`${jugador.localidad}`} estado={`${jugador.estado}`}
            id={`${jugador.id}`}/>
          ))}
        </div>
        <div className="containerCentrarJugadores">
            <Link to={`/admin`}><button className='btn btn-warning jugadoresButton'>Volver</button></Link>
        </div>
    </>
  )
}