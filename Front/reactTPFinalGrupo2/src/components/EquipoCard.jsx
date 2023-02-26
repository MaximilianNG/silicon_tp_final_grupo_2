import '../styles/mostrarEquipos.css';
import * as API from '../services/equiposService'
import { useState, useRef, useEffect } from 'react'
import * as APIJuegos from '../services/juegosService'
import { v4 as uuidv4 } from 'uuid'

export function EquipoCard(props) {
    //Capturamos los props en variables.
    let id = props.id;
    let nombre = props.nombre;
    let juego = props.juego;
    let estado = false;
    if (props.estado == 1) {
        estado = true;
    }

    //Estados
    const [juegos, setJuegos] = useState([])
    const [editar, setEditar] = useState(false)
    const [animacion, setAnimacion] = useState(false)

    //Effects
    useEffect(() => {
        APIJuegos.getJuegos().then(setJuegos);
    }, [])

    //Referencias
    const nombre_equipo = useRef();
    const juego_equipo = useRef();

    //Utilidades
    const estadoEquipo = async(id, estado) => {
    const datos_enviar = {
        estado: estado
    };
    const respuesta = await API.estadoEquipo(id, datos_enviar)
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
    }

    const renderEditarForm = () => {
        setEditar(!editar);//toggle
        setTimeout(()=>{
          setAnimacion(!animacion)
      }, 10);
    }

    const editarEquipo = async (id) => {
        const nombre = nombre_equipo.current.value;
        const id_juego = juego_equipo.current.value;
        const datos_enviar = {
            nombre: nombre,
            id_juego: id_juego
        };
        const respuesta = await (API.editarEquipo(id, datos_enviar));
        nombre_equipo.current.value = "";
        respuesta.status?
        console.log(respuesta.mensaje):
        console.log(respuesta.mensaje);;
    }

    return(
    <>
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">Juego: {juego}</p>
        </div>
        <div className="cardBotonesContainer">
            <button onClick={() => renderEditarForm()} className="btn btn-primary">Editar</button>
            {estado?
            <button onClick={() => estadoEquipo(id, '0')}
            className="btn btn-success">Activo</button>:
            <button onClick={() => estadoEquipo(id, '1')} 
            className="btn btn-danger">Inactivo</button>}
        </div>
        {editar?
        <form className={`editarContainer ${animacion ? "mostrar" : ""}`}>
          <div>
            <label htmlFor="nombreEquipo" className="form-label mx-2 mt-2">Nuevo nombre del equipo:</label>
            <input type="text" className="form-control mb-3" id="nombreEquipo" 
            aria-describedby="nombreEquipo" ref={nombre_equipo}/>
            <label htmlFor="juegoEquipo" className="form-label">Juego del equipo</label>
            <select className="form-select" aria-label="Juegos activos para elegir" ref={juego_equipo}>
              {juegos.map((juego) => {
                if (juego.estado != 0) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                  )
                }
                })}
            </select>
          </div>
          <button onClick={() => editarEquipo(id)} type="button" className="btn btn-primary mt-2">Editar</button>
        </form>: 
        <></>}
    </div>
    </>
    ) 
}