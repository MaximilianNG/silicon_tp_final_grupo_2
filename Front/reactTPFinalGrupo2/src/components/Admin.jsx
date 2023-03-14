import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/admin.css'
import '../styles/footer.css'
import { Juegos } from './Juegos'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Navbar  from './Navbar'
import  Footer  from './Footer'

export function Admin() {
  //Estados
  const [problema, setProblema] = useState(false);

  //Effects
  useEffect(() => {
    const usuario = window.localStorage.getItem('usuario');
    const token = window.localStorage.getItem('token');
    if (usuario == null || usuario == undefined || token == null || token == undefined) {
      toast.error("Problema de autenticación, haga click en volver.", {
        toastId: "problema",
        autoClose: 6000
      });
      setProblema(true);
    }
  }, [])

  //Utilidades
  const clearToken = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('token');
  }
  return (
      <>
        <Navbar/>
        
        <div className="containerP">


          <div className="slider">
            <ul>
                <li>
                    <img src="https://images.alphacoders.com/608/608898.jpg"/>
                </li>
                <li>
                    <img src="https://images7.alphacoders.com/570/570390.jpg"/>
                </li>
                <li>
                    <img src="https://images.alphacoders.com/128/1282982.jpg"/>
                </li>
                <li>
                    <img src="https://images8.alphacoders.com/627/627080.png"/>
                </li>
            </ul>
          </div>
          
        </div>
        <Footer/>
      </>
  )
}
