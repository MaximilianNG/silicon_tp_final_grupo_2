import { Link } from 'react-router-dom'
import '../styles/sponsors.css'
import { SponsorCard } from './SponsorCard'
import * as API from '../services/sponsorsService'
import * as APIEquipos from '../services/equiposService'
import * as APITorneos from '../services/torneosService'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Sponsors() {
  //Estados
  const [sponsors, setSponsors] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [equiposT, setEquiposT] = useState([]);
  const [torneosT, setTorneosT] = useState([]);

  //Referencias
  const nombre_sponsor = useRef();

  //Effects
  useEffect(() => {
    API.getSponsors().then(setSponsors);
    APIEquipos.getEquipos().then(setEquiposT);
    APITorneos.getTorneos().then(setTorneosT);
  }, [])

  //Utilidades
  const nuevoSponsor = async () => {
    let control = false;
    const datos_enviar = {
      nombre: nombre_sponsor.current.value
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
      const respuesta = await API.nuevoSponsor(datos_enviar);
      respuesta.status?
      console.log(respuesta.mensaje):
      console.log(respuesta.mensaje);;
      window.location.reload(false);
    }
  }

  function renderNuevoSponsorForm() {
    setNuevo(!nuevo);
  }



  return (
      <>
      <div className="containerCentrar">
            <button onClick={renderNuevoSponsorForm} className='btn btn-success juegosButton'>Crear Sponsor</button>
      </div>
      {nuevo?
        <form className={`containerNuevoSponsor`}>
          <div>
            <label htmlFor="nombreSponsor" className="form-label text-light mb-2">Nombre del sponsor</label>
            <input type="text" className="form-control mb-3" id="nombreSponsor" 
            aria-describedby="nombreSponsor" ref={nombre_sponsor}/>
          </div>
          <button onClick={nuevoSponsor} type="button" className="btn btn-primary">Agregar</button>
        </form>
      :
      <></>
      }
        <div className="containerSponsors">
           {sponsors.map((sponsor) => (
            <SponsorCard key={uuidv4()} id={sponsor.id} nombre={sponsor.nombre} equipos={sponsor.equipos_sponsoreados}
            torneos={sponsor.torneos_sponsoreados} estado={sponsor.estado} equiposT={equiposT} torneosT={torneosT}/>
          )) } 
        </div>
        <div className="containerCentrar">
            <Link to={`/admin`}><button className='btn btn-warning sponsorsButton'>Volver</button></Link>
        </div>
      </>
  )
}
