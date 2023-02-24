import '../styles/juegoCard.css'
import * as API from '../services/juegosService'
import { useState, useRef } from 'react'

export function JuegoCard(props) {
  //Guardamos el estado que viene en las props para que el botón se alta o baja
  //se renderice condicionalmente
  let estado = false;
  if (props.estado == 1) {
    estado = true;
  }
  //Guardamos el id también
  let id = props.id;
  ////////////////////////////

  const [editar, setEditar] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  const nombre_juego = useRef();

  const estadoJuego = async(id, estado) => {
    //El estado se escribe así para mandarlo como body en el requestOptions, donde va a ser "datos".
    const datos_enviar = {
      estado: estado
    };
    //Llamo a la función que se conecta con el back, mandándole el id del juego que queremos cambiar
    //y el estado actual.
    const respuesta = await API.estadoJuego(id, datos_enviar)
    //La respuesta que viene del back tiene dos propiedades: status y mensaje. Los usamos para ver
    //qué pasó.
    respuesta.status?
    //Si vino true, mostranos el mensaje de que salió todo bien
    console.log(respuesta.mensaje):
    //Si no, el otro.
    console.log(respuesta.mensaje);;
  }

  const renderEditarForm = () => {
    setEditar(!editar);//toggle
    setTimeout(()=>{
      setAnimacion(!animacion)
  }, 10);
  }

  const editarJuego = async (id) => {
    const nombre = nombre_juego.current.value;
    const datos_enviar = {
      nombre: nombre
    };
    const respuesta = await (API.editarJuego, datos_enviar);
    nombre_juego.current.value = "";
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
  }

  return (
    <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
            </div>
            <div className="cardBotonesContainer">
                <button onClick={() => renderEditarForm()} className="btn btn-primary">Editar</button>
                {estado?
                <button onClick={() => estadoJuego(id, '0')}
                className="btn btn-danger">Dar de baja</button>:
                <button onClick={() => estadoJuego(id, '1')} 
                className="btn btn-success">Dar de alta</button>}
            </div>
            {editar?
            <form className={`editarContainer ${animacion ? "mostrar" : ""}`}>
              <div>
                <label htmlFor="nombreJuego" className="form-label mx-2">Nuevo nombre del juego:</label>
                <input type="text" className="form-control mb-3" id="nombreJuego" 
                aria-describedby="nombreJuego" ref={nombre_juego}/>
              </div>
              <button onClick={() => editarJuego(id)} type="button" className="btn btn-primary">Editar</button>
            </form>: 
            <></>}
        </div>
    </>
  )
}
