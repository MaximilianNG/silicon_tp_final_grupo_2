import { Link } from 'react-router-dom'
import '../styles/login.css'
import '../styles/reset.css'

export function Login() {
  return (
      <>
        <div className="text-light loginForm">
            <form className="mx-3 align-self-center">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Ingrese su correo" />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Ingrese su contraseña" />
                </div>
{/*                 <button type="submit" className="btn btn-primary mt-3">Entrar</button> */}
                    <Link to={`/admin`} className="btn btn-primary mt-3">Entrar</Link>
            </form>
        </div>
      </>
  )
}
