import '../styles/juegoCard.css'
import * as API from '../services/juegosService'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export function JuegoCard(props) {
  let estado = false;
  if (props.estado == 1) {
    estado = true;
  }
  let id = props.id;
  ////////////////////////////
  //Navigate
  const navigate = useNavigate();

  const [editar, setEditar] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  const nombre_juego = useRef();

  const estadoJuego = async(id, estado) => {
    const datos_enviar = {
      estado: estado
    };
    const respuesta = await API.estadoJuego(id, datos_enviar)
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
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const editarJuego = async (id, event) => {
    event.preventDefault();
    const nombre = nombre_juego.current.value;
    if (nombre == props.nombre) {
      toast.warning("El juego ya tiene ese nombre.", {
        toastId: "picarón"
      })
      return false;
    }
    const datos_enviar = {
      nombre: nombre
    };
    const respuesta = await (API.editarJuego(id, datos_enviar));
    nombre_juego.current.value = "";
    respuesta.status?
    toast.success("El juego se editó exitosamente. Refrescando...", {
      toastId: "éxito",
      onClose: () => {
        navigate(0);
      }
    }):
    toast.warning("Hubo un error editando el juego.", {
      toastId: "error"
    })
  }

  return (
    <>
        <div className="card">
            <div className="card-body card-header">
              <div className="container">
                <div className="row">
                  <div className="col"><h5 className="card-header">{props.nombre}</h5></div>
                  <div className="col">
                  <div className="cardBotonesContainer float-end">
                <button onClick={() => renderEditarForm()} className={editar?"btn btn-warning":"btn btn-primary"}>Editar</button>
                {estado?
                <button onClick={() => estadoJuego(id, '0')}
                className="btn btn-success">Activo</button>:
                <button onClick={() => estadoJuego(id, '1')} 
                className="btn btn-danger">Inactivo</button>}
            </div>
                  </div>
                </div>
              </div>
                
            </div>

            {editar?
            <form id="editarJuego" className={`editarContainer ${animacion ? "mostrar" : ""}`}
                  onSubmit={(e) => editarJuego(id, e)}>
              <div>
                <label htmlFor="nombreJuego" className="form-label mx-2 pt-3">Nuevo nombre del juego:</label>
                <input type="text" className="form-control mb-3" id="nombreJuego" required
                aria-describedby="nombreJuego" ref={nombre_juego} defaultValue={props.nombre}/>
              </div>
              <button type="submit" form="editarJuego" className="btn btn-primary">Editar</button>
            </form>: 
            <></>}
        </div>
    </>
  )
}
