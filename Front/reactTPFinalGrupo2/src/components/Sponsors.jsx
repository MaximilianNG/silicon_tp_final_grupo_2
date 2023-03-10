import { Link } from 'react-router-dom'
import '../styles/sponsors.css'
import { SponsorCard } from './SponsorCard'
import * as API from '../services/sponsorsService'
import * as APIEquipos from '../services/equiposService'
import * as APITorneos from '../services/torneosService'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export function Sponsors() {
  //Navigate
  const navigate = useNavigate();

  //Estados
  const [sponsors, setSponsors] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [equiposT, setEquiposT] = useState([]);
  const [torneosT, setTorneosT] = useState([]);
  const [problema, setProblema] = useState(false);

  //Referencias
  const nombre_sponsor = useRef();

  //Effects
  useEffect(() => {
    API.getSponsors().then((datos) => {
      if (datos.status == undefined) {
        setSponsors(datos);
      } else if (datos.status == false) {
        toast.error("Problema de autenticación, haga click en volver.", {
          toastId: "problema",
          autoClose: 6000
        });
        setProblema(true);
      }
    });
    APIEquipos.getEquipos().then(setEquiposT);
    APITorneos.getTorneos().then(setTorneosT);
  }, [])

  //Utilidades
  const nuevoSponsor = async (e) => {
    e.preventDefault()
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
      toast.warning("Por favor complete todos los campos del formulario.", {
        toastId: "error"
      })
      return
    } else {
      const respuesta = await API.nuevoSponsor(datos_enviar);
      respuesta.status?
      toast.success("El sponsor se creó exitosamente. Refrescando...", {
        toastId: "éxito",
        onClose: () => {
          navigate(0);
        }
      }):
      toast.warning("Hubo un error creando el sponsor.", {
        toastId: "error"
      })
    }
  }

  function renderNuevoSponsorForm() {
    setNuevo(!nuevo);
  }

  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
    }

  return (
      <>
      {problema?
      <div className="containerCentrar">
        <Link to={`/`}><button onClick={clearToken} className="btn btn-danger juegosButton">Volver</button></Link>
      </div>:
      <></>}

      <div className={problema?"d-none":"containerCentrar"}>
            <button onClick={renderNuevoSponsorForm} className='btn btn-success juegosButton'>Crear Sponsor</button>
            <Link to={`/admin`}><button className='btn btn-warning sponsorsButton'>Volver</button></Link>
      </div>
      {nuevo?
        <form id="nuevoSponsor" onSubmit={(e) => nuevoSponsor(e)} className={`containerNuevoSponsor`}>
          <div>
            <label htmlFor="nombreSponsor" className="form-label text-light mb-2">Nombre del sponsor</label>
            <input required type="text" className="form-control mb-3" id="nombreSponsor" 
            aria-describedby="nombreSponsor" ref={nombre_sponsor}/>
          </div>
          <button form="nuevoSponsor" type="submit" className="btn btn-primary">Agregar</button>
        </form>
      :
      <></>
      }
        <div className="containerSponsors">
          <div className="container">
            <div className="row gy-3">
            {sponsors.map((sponsor) => (
              <SponsorCard key={uuidv4()} id={sponsor.id} nombre={sponsor.nombre} equipos={sponsor.equipos_sponsoreados}
              torneos={sponsor.torneos_sponsoreados} estado={sponsor.estado} equiposT={equiposT} torneosT={torneosT}/>
            )) }
            </div>
          </div>

        </div>
      </>
  )
}
