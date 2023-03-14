import '../styles/mostrarEquipos.css';
import * as API from '../services/equiposService'
import { useState, useRef, useEffect } from 'react'
import * as APIJuegos from '../services/juegosService'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export function EquipoCard(props) {
    //Navigate
    const navigate = useNavigate();

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

    const editarEquipo = async (id, e) => {
      e.preventDefault()
      const nombre = nombre_equipo.current.value;
      const id_juego = juego_equipo.current.value;
      if (id_juego == 0) {
        if (nombre == props.nombre) {
          toast.warning("El equipo ya tiene esos valores.", {
            toastId: "picarón"
          })
          return false;
        }
      }

      if ( nombre == "") {
        toast.warning("No se puede dejar el nombre vacío.", {
          toastId: "vacío"
        })
        return false;
      }
      const datos_enviar = {
          nombre: nombre,
          id_juego: id_juego
      };
      const respuesta = await (API.editarEquipo(id, datos_enviar));
      nombre_equipo.current.value = "";
      respuesta.status?
      toast.success("El equipo se editó exitosamente. Refrescando...", {
        toastId: "éxito",
        onClose: () => {
          navigate(0);
        }
      }):
      toast.warning("Hubo un error editando el equipo.", {
        toastId: "error"
      })
    }

    return(
    <>
    <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <h5 className="card-title card-header">{nombre}</h5>
              </div>
              <div className="col">
                <p className="card-text">Juego: {juego}</p>
              </div>
              <div className="col">
                <div className="cardBotonesContainer float-end">
                  <button onClick={() => renderEditarForm()} className={editar?"btn btn-warning":"btn btn-primary"}>Editar</button>
                  {estado?
                  <button onClick={() => estadoEquipo(id, '0')}
                  className="btn btn-success">Activo</button>:
                  <button onClick={() => estadoEquipo(id, '1')} 
                  className="btn btn-danger">Inactivo</button>}
                </div>  
              </div>
            </div>
          </div>
            
            
        </div>


        {editar?
        <form id="editarEquipo" onSubmit={(e) => editarEquipo(id, e)} className={`editarContainer ${animacion ? "mostrar" : ""}`}>
          <div>
            <label htmlFor="nombreEquipo" className="form-label mx-2 mt-2">Nombre del equipo:</label>
            <input required type="text" className="form-control mb-3" id="nombreEquipo" 
            aria-describedby="nombreEquipo" ref={nombre_equipo} defaultValue={nombre}/>
            <label htmlFor="juegoEquipo" className="form-label">Juego del equipo</label>
            <select className="form-select" aria-label="Juegos activos para elegir" ref={juego_equipo}>
              <option key={uuidv4()} className="dropdown-item" value="0">No cambiar el juego</option>
              {juegos.map((juego) => {
                if (juego.estado != 0 && juego.nombre != props.juego) {
                  return (
                    <option key={uuidv4()} className="dropdown-item" value={juego.id}>{juego.nombre}</option>
                  )
                }
                })}
            </select>
          </div>
          <button form="editarEquipo" type="submit" className="btn btn-primary mt-2">Editar</button>
        </form>: 
        <></>}
    </div>
    </>
    ) 
}