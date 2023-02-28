import '../styles/torneoCard.css'
import { useState, useEffect, useRef } from 'react'
import * as API from '../services/torneosService'

export function TorneoCard(props) {
  //Constructor
  let juego = props.juego;
  let id = props.id;
  let fecha = props.fecha.split("T")[0];
  let localidad = props.localidad;
  let estado = false;
  if (props.estado == 1) {
    estado = true;
  }

  //Estados


  //Utilidades
  const estadoTorneo = async(id, estado) => {
    const datos_enviar = {
        estado: estado
    };
    const respuesta = await API.estadoTorneo(id, datos_enviar)
    respuesta.status?
    console.log(respuesta.mensaje):
    console.log(respuesta.mensaje);;
    window.location.reload(false);
    }

  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Fecha: {fecha}</h5>
            <p className="card-text">Juego: {juego}</p>
            <p className="card-text">Localidad: {localidad}</p>
        </div>
        <div className="cardBotonesContainer">
            <a href="#" className="btn btn-primary">Editar</a>
            {estado?
            <button onClick={() => estadoTorneo(id, "0")} className="btn btn-success">Activo</button>:
            <button onClick={() => estadoTorneo(id, "1")} className="btn btn-danger">Inactivo</button>}
        </div>
    </div>
  )
}
