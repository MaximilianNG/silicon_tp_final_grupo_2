import '../styles/jugadoresCard.css'
import { useState, useRef } from 'react'
import * as API from '../services/jugadoresService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export function JugadoresCard(props) {
  //Navigate
  const navigate = useNavigate();

  //Estados
  const [editar, setEditar] = useState(false);

  //Referencias
  const nombreEd = useRef();
  const apellidoEd = useRef();
  const nombre_profesionalEd = useRef();
  const emailEd = useRef();
  const id_localidadEd = useRef();
  const id_equipoEd = useRef();

  //Constructor
  let estado = false;
  if (props.estado == 1) {
    estado = true;
  }

  //Utilidades
  const estadoJugador = async(id, estado) => {
    const datos_enviar = {
        estado: estado
    };
    const respuesta = await API.estadoJugador(id, datos_enviar)
    respuesta.status?
    toast.success("El estado se cambió exitosamente. Refrescando...", {
      toastId: "éxito",
      onClose: () => {
        navigate(0);
      }
    }):
    toast.warning("Hubo un error cambiando el estado.", {
      toastId: "error"
    })
  }

  const renderEditarForm = () => {
    setEditar(!editar);
  }

  const editarJugador = async (id, e) => {
    e.preventDefault()
    let control = false;

    const datos_enviar = {
      nombre: nombreEd.current.value,
      apellido: apellidoEd.current.value,
      nombre_profesional: nombre_profesionalEd.current.value,
      email: emailEd.current.value,
      id_localidad: id_localidadEd.current.value,
      id_equipo: id_equipoEd.current.value
    };

    for (const propiedad in datos_enviar) {
      if (datos_enviar[propiedad] == "0" || datos_enviar[propiedad] == "") {
        control = true;
      }
    }

    if (control) {
      toast.warning("Por favor complete todos los campos.", {
        toastId: "picarón"
      })
      return false

    } else {
      const respuesta = await (API.editarJugador(id, datos_enviar));
      respuesta.status?
    toast.success("El jugador se editó exitosamente. Refrescando...", {
      toastId: "éxito",
      onClose: () => {
        navigate(0);
      }
    }):
    toast.warning("Hubo un error editando el jugador.", {
      toastId: "error"
    })
    }
  }

  return (
    <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row card-header">
              <div className="col">
                <h5 className="card-title">Nombre: {props.nombre}</h5>

              </div>
              <div className="col">
                <p className="card-text">Apellido: {props.apellido}</p>
              </div>
              <div className="col">
                <p className="card-text">Apodo: {props.nombre_profesional}</p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <p className="card-text">Email: {props.email}</p>
              </div>
              <div className="col">
                <p className="card-text">Localidad: {props.localidad}</p>
              </div>
              <div className="col">
                <p className="card-text">Equipo: {props.equipo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cardBotonesContainer">
            <button onClick={() => renderEditarForm()} className="btn btn-primary">Editar</button>
            {estado?
            <button onClick={() => estadoJugador(props.id, "0")} className="btn btn-success">Activo</button>:
            <button onClick={() => estadoJugador(props.id, "1")} className="btn btn-danger">Inactivo</button>}
        </div>

        {editar?
        <form id="editarJugador" onSubmit={(e) => editarJugador(props.id, e)} className='containerEdJugador'>
          <div>
            <label htmlFor="nombreJugador" className="form-label mb-2">Nombre</label>
            <input required type="text" className="form-control mb-3" id="edNombreJugador" 
            aria-describedby="nombreJugador" ref={nombreEd}/>
      </div>
      <div>
        <label htmlFor="apellidoJugador" className="form-label mb-2">Apellido</label>
        <input required type="text" className="form-control mb-3" id="edApellidoJugador" 
        aria-describedby="apellidoJugador" ref={apellidoEd}/>
      </div>
      <div>
        <label htmlFor="nombre_profesional" className="form-label mb-2">Apodo</label>
        <input required type="text" className="form-control mb-3" id="edApodoJugador" 
        aria-describedby="nombre_profesional" ref={nombre_profesionalEd}/>
      </div>
      <div>
        <label htmlFor="emailJugador" className="form-label mb-2">Email</label>
        <input required type="email" className="form-control mb-3" id="edEmailJugador" 
        aria-describedby="emailJugador" ref={emailEd}/>
      </div>
      <label htmlFor="localidadJugador" className="form-label mb-2 ">Localidad del jugador</label>
            <select className="form-select" aria-label="Elegir localidad del torneo" ref={id_localidadEd}>
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

        <label htmlFor="equipoJugador" className="form-label mb-2 mt-3">Equipo del jugador</label>
            <select className="form-select" aria-label="Elegir equipo del jugador" ref={id_equipoEd}>
            <option className="dropdown-item" value="0">Elija un equipo</option>
            {props.equiposT.map((equipo) => {
                    if (equipo.estado != 0 && !props.equipo.includes(equipo.nombre)) {
                      return (
                        <option key={uuidv4()} className="dropdown-item" value={equipo.id}>{equipo.nombre}</option>
                      )
                    }
                    })}
            </select>
              <button form='editarJugador' type="submit" className="btn btn-primary mt-3">Editar</button>
            </form>: 
        <></>}
    </div>
  )
}




