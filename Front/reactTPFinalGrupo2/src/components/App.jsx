import { Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { Admin } from './Admin'
import { Juegos } from './Juegos'
import { Torneos } from './Torneos'
import { Sponsors } from './Sponsors'
import { Equipos } from './Equipos'
import { Jugadores } from './Jugadores'
import { ToastContainer, Flip, toast } from 'react-toastify';
import '../styles/app.css'

function App() {
  return (
  <>
  <div className="fullContainer">
    <img src='../imagenes/logotorneo.png' id='Logo' alt='imagen del Logo'></img>
    {/* <p className="display-4 text-light text-center bg-gradient">TP Final Grupo 2</p> */}
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/juegos' element={<Juegos />}></Route>
      <Route path='/torneos' element={<Torneos />}></Route>
      <Route path='/sponsors' element={<Sponsors />}></Route>
      <Route path='/equipos' element={<Equipos />}></Route>
      <Route path='/jugadores' element={<Jugadores />}></Route>
    </Routes>
  </div>
  <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
          />
  </>
  )
}

export default App