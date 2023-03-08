import { Link } from 'react-router-dom'
import '../styles/login.css'
import '../styles/reset.css'
import { useState } from 'react'
import * as API from '../services/loginService'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    //Estados
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);

    //Navigate
    const navigate = useNavigate();

    //Utilities
    const login = async (event) =>{
        event.preventDefault();
        const datos_enviar = {
            usuario: usuario,
            password: password
        }
        const respuesta = await API.login(datos_enviar);
        if (respuesta == undefined) {
            console.log("Hubo un error en el back y no se pudo hacer login.");
        } else if (respuesta.status) {
            window.localStorage.setItem('usuario', JSON.stringify(respuesta.datos[0].usuario));
            window.localStorage.setItem('token', JSON.stringify(respuesta.token));
           setUsuario('')
           setPassword('')
           toast.success("Credenciales correctas, ingresando...", {
            toastId: "éxito",
            onClose: () => {
                navigate(`/admin`)
            }
          });
        } else if (respuesta.status == false) {
            toast.warning("Credenciales incorrectas, intente de nuevo.", {
                toastId: "error"
              });
        }
    }

  return (
      <>
        <div className="text-light loginForm" >
            <form className="mx-3 align-self-center" id="login" onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Usuario</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Ingrese su nombre de usuario"
                    value={usuario}
                    onChange={(event) => setUsuario(event.target.value)}/>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>
                    <button form="login" type="submit" className="btn btn-primary mt-3">Entrar</button>
            </form>
        </div>
      </>
  )
}
