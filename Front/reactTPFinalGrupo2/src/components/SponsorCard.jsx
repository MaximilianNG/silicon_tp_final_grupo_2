import '../styles/sponsorCard.css'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as API from '../services/sponsorsService'


export function SponsorCard(props) {
  //Estados
  const [editarNombre, setEditarNombre] = useState(false);
  const [editarEquipos, setEditarEquipos] = useState(false);
  const [editarEquiposAgregar, setEditarEquiposAgregar] = useState(false);
  const [editarEquiposQuitar, setEditarEquiposQuitar] = useState(false);
  const [editarTorneos, setEditarTorneos] = useState(false);
  const [editarTorneosAgregar, setEditarTorneosAgregar] = useState(false);
  const [editarTorneosQuitar, setEditarTorneosQuitar] = useState(false);

  //Referencias
  const nombre_sponsor = useRef()
  const agregar_o_quitar_equipos = useRef()
  const agregar_o_quitar_torneos = useRef()
  const bot_AOQ = useRef()
  const id_equipo_agregar = useRef()
  const id_equipo_quitar = useRef()
  const id_torneo_agregar = useRef()
  const id_torneo_quitar = useRef()

  //Utilities
  const estadoSponsor = async(id, estado) => {
    const datos_enviar = {
        estado: estado
    };
    const respuesta = await API.estadoSponsor(id, datos_enviar)
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
    window.location.reload(false);
    }

  ////////////////////////////////

  const renderEditarNombreForm = () => {
    setEditarNombre(!editarNombre)
  }

  ///////////////////////////////

  const editarSponsorNombre = async (id) => {
    const nombre = nombre_sponsor.current.value;
    const datos_enviar = {
      nombre: nombre
    };
    const respuesta = await (API.editarSponsorNombre(id, datos_enviar));
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);
    window.location.reload(false);
  }

  ////////////////////////////////

  const renderEditarEquiposForm = () => {
    setEditarEquipos(!editarEquipos)
  }

  const renderEditarTorneosForm = () => {
    setEditarTorneos(!editarTorneos)
  }

  ////////////////////////////////

  const renderEditarEquiposAgregarOQquitarForm = () => {
    if (agregar_o_quitar_equipos.current.value == 0) {
      console.log("Elija agregar o quitar.");
      return
    }
    if (agregar_o_quitar_equipos.current.value == 1) {
      setEditarEquiposAgregar(!editarEquiposAgregar)
      const boton = bot_AOQ.current;
      boton.setAttribute("disabled", "");
      const select = agregar_o_quitar_equipos.current;
      select.setAttribute("disabled", "")
    } else {
      setEditarEquiposQuitar(!editarEquiposQuitar)
      const boton = bot_AOQ.current;
      boton.setAttribute("disabled", "");
      const select = agregar_o_quitar_equipos.current;
      select.setAttribute("disabled", "")
    }
  }

  ////////////////////////////////

  const renderEditarTorneosAgregarOQquitarForm = () => {
    if (agregar_o_quitar_torneos.current.value == 0) {
      console.log("Elija agregar o quitar.");
      return
    }
    if (agregar_o_quitar_torneos.current.value == 1) {
      setEditarTorneosAgregar(!editarTorneosAgregar)
      const boton = bot_AOQ.current;
      boton.setAttribute("disabled", "");
      const select = agregar_o_quitar_torneos.current;
      select.setAttribute("disabled", "")
    } else {
      setEditarTorneosQuitar(!editarTorneosQuitar)
      const boton = bot_AOQ.current;
      boton.setAttribute("disabled", "");
      const select = agregar_o_quitar_torneos.current;
      select.setAttribute("disabled", "")
    }
  }

  ////////////////////////////////

  const agregarEquipoSponsoreado = async (id) => {
    let control = false;
    const datos_enviar = {
      id_equipo: id_equipo_agregar.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await API.nuevoEquipoSponsoreado(id, datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  //////////////////////////

  const quitarEquipoSponsoreado = async (id) => {
    let control = false;
    const datos_enviar = {
      id_equipo: id_equipo_quitar.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await API.quitarEquipoSponsoreado(id, datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  //////////////////////////

  const agregarTorneoSponsoreado = async (id) => {
    let control = false;
    const datos_enviar = {
      id_torneo: id_torneo_agregar.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await API.nuevoTorneoSponsoreado(id, datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  //////////////////////////

  const quitarTorneoSponsoreado = async (id) => {
    let control = false;
    const datos_enviar = {
      id_torneo: id_torneo_quitar.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      console.log("Completá el formulario y portate bien.");
      return
    } else {
      const respuesta = await API.quitarTorneoSponsoreado(id, datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  //////////////////////////

  return (
    <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="fw-bolder">{props.nombre}  <button onClick={renderEditarNombreForm} className="btn btn-primary pt-1 mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg></button></h5>
          </div>
          {editarNombre?
            <form className={`editarContainer`}>
              <div>
                <label htmlFor="nombreSponsor" className="form-label mx-2">Nuevo nombre del sponsor:</label>
                <input type="text" className="form-control mb-3" id="nombreSponsor" 
                aria-describedby="nombreSponsor" ref={nombre_sponsor}/>
              </div>
              <button onClick={() => editarSponsorNombre(props.id)} type="button" className="btn btn-primary">Confirmar</button>
            </form>: 
            <></>}
          <hr className='bg-danger border-5 border-top border-dark'></hr>

          
            
            <div className="text-center mb-3">
              <p className="card-text fw-bold">Equipo/s sponsoreados:<br></br></p>
              { props.equipos.length >= 1?
                props.equipos.map((equipo) => (
                  <p key={uuidv4()} className="text-center">{equipo}<br></br></p>
                )):
                <p className='text-center'>Ningún equipo</p>
                }
                <button onClick={renderEditarEquiposForm} className="btn btn-primary">Editar equipos</button>
            </div>

            {editarEquipos?
            <form className={`editarContainer`}>
              <label htmlFor="agregarOQuitar" className="form-label my-2 fw-bold">Elija una opción:</label>
              <select className="form-select" aria-label="Agregar o quitar equipos" ref={agregar_o_quitar_equipos}>
                <option className="dropdown-item" value="0">¿Agregar o quitar un equipo?</option>
                <option className='dropdown-item' value="1">Agregar</option>
                <option className='dropdown-item' value="2">Quitar</option>
              </select>
              <button onClick={renderEditarEquiposAgregarOQquitarForm} type="button" className="btn btn-light mt-3" ref={bot_AOQ}>Siguiente</button>
            </form>
            : 
            <></>}

            {editarEquiposAgregar?
            <form className="editarContainer pt-3">
              <p className='fw-bold'>Agregar un equipo:</p>
              <select className="form-select mt-2" aria-label="Equipos para agregar" ref={id_equipo_agregar}>
                  <option className="dropdown-item" value="0">Elija un equipo</option>
                  {props.equiposT.map((equipo) => {
                    if (equipo.estado != 0 && !props.equipos.includes(equipo.nombre)) {
                      return (
                        <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                      )
                    }
                    })}
              </select>
              <button onClick={() => agregarEquipoSponsoreado(props.id)} type="button" className="btn btn-success mt-3">Agregar</button>
            </form>
            :
            <></>}

            {editarEquiposQuitar?
            <form className="editarContainer pt-3">
            <p className='fw-bold'>Quitar un equipo:</p>
            <select className="form-select" aria-label="Equipos para quitar" ref={id_equipo_quitar}>
                <option className="dropdown-item" value="0">Elija un equipo</option>
                {props.equiposT.map((equipo) => {
                  if (props.equipos.includes(equipo.nombre)) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                    )
                  }
                  })}
            </select>
            <button onClick={() => quitarEquipoSponsoreado(props.id)} type="button" className="btn btn-danger mt-3">Quitar</button>
          </form>
            :
            <></>}
            <hr></hr>
          
          <div className="text-center">
            <p className="card-text fw-bold">Torneo/s sponsoreados:<br></br></p>
              { props.torneos.length >= 1?
                props.torneos.map((torneo) => (
                  <p key={uuidv4()} className="text-center">{torneo}<br></br></p>
                )):
                <p className='text-center'>Ningún equipo.</p>
              }
              <button onClick={renderEditarTorneosForm} className="btn btn-primary">Editar torneos</button>
          </div>

          {editarTorneos?
            <form className={`editarContainer`}>
              <label htmlFor="agregarOQuitar" className="form-label my-2 fw-bold">Elija una opción:</label>
              <select className="form-select" aria-label="Agregar o quitar torneos" ref={agregar_o_quitar_torneos}>
                <option className="dropdown-item" value="0">¿Agregar o quitar un torneo?</option>
                <option className='dropdown-item' value="1">Agregar</option>
                <option className='dropdown-item' value="2">Quitar</option>
              </select>
              <button onClick={renderEditarTorneosAgregarOQquitarForm} type="button" className="btn btn-light mt-3" ref={bot_AOQ}>Siguiente</button>
            </form>
            : 
            <></>}

          {editarTorneosAgregar?
            <form className="editarContainer pt-3">
              <p className='fw-bold'>Agregar un torneo:</p>
              <select className="form-select mt-2" aria-label="Torneos para agregar" ref={id_torneo_agregar}>
                  <option className="dropdown-item" value="0">Elija un torneo</option>
                  {props.torneosT.map((torneo) => {
                    if (torneo.estado != 0 && !props.torneos.includes(torneo.nombre)) {
                      return (
                        <option key={uuidv4()} className="dropdown-item" value={torneo.id}>{torneo.nombre}</option>
                      )
                    }
                    })}
              </select>
              <button onClick={() => agregarTorneoSponsoreado(props.id)} type="button" className="btn btn-success mt-3">Agregar</button>
            </form>
            :
            <></>}

            {editarTorneosQuitar?
            <form className="editarContainer pt-3">
            <p className='fw-bold'>Quitar un torneo:</p>
            <select className="form-select" aria-label="Torneos para quitar" ref={id_torneo_quitar}>
                <option className="dropdown-item" value="0">Elija un torneo</option>
                {props.torneosT.map((torneo) => {
                  if (props.torneos.includes(torneo.nombre)) {
                    return (
                      <option key={uuidv4()} className="dropdown-item" value={torneo.id}>{torneo.nombre}</option>
                    )
                  }
                  })}
            </select>
            <button onClick={() => quitarTorneoSponsoreado(props.id)} type="button" className="btn btn-danger mt-3">Quitar</button>
          </form>
            :
            <></>}

        </div>

          <hr></hr>
        <div className="cardBotonesContainer">
            {props.estado?
            <button onClick={() => estadoSponsor(props.id, "0")} className="btn btn-success">Activo</button>:
            <button onClick={() => estadoSponsor(props.id, "1")} className="btn btn-danger">Inactivo</button>
            }
        </div>
    </div>
  )
}