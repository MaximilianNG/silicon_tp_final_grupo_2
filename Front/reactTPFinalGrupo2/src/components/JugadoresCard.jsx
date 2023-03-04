import '../styles/torneoCard.css'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/jugadoresService'

export function JugadoresCard(props) {
  //Constructor
  let nombre = props.nombre;
  let apellido = props.apellido;
  let apodo = props.apodo;
  let email = props.email;
  let equipo = props.equipo;
  let id = props.id;
  let localidad = props.localidad;
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
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
    window.location.reload(false);
    }

  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Nombre: {nombre}</h5>
            <p className="card-text">Apellido: {apellido}</p>
            <p className="card-text">Apodo: {apodo}</p>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Localidad: {localidad}</p>
            <p className="card-text">Equipo: {equipo}</p>
            <p className="card-text">Estado: {estado}</p>
            
        </div>
        <div className="cardBotonesContainer">
            <a href="#" className="btn btn-primary">Editar</a>
            {estado?
            <button onClick={() => estadoJugador(id, "0")} className="btn btn-success">Activo</button>:
            <button onClick={() => estadoJugador(id, "1")} className="btn btn-danger">Inactivo</button>}
        </div>
    </div>
  )
}






// export function JugadoresCard() {
//   return (
//     <>
//         <div className="card">
//             <div className="card-body">
//                 <h5 className="card-title">Nombre</h5>
//                 <h5 className="card-title">Apellido</h5>
//                 <h5 className="card-title">Apodo</h5>
//                 <h5 className="card-title">Email</h5>
//                 <h5 className="card-title">Localidad</h5>
//                 <h5 className="card-title">Equipo</h5>
//                 <h5 className="card-title">Estado</h5>
//                 <div className="cardBotonesContainer">
//                     <a href="#" className="btn btn-primary">Editar</a>
//                     <a href="#" className="btn btn-danger">Dar de baja</a>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }