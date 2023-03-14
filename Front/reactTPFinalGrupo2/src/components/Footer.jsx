import inst from '../../imagenes/inst.png'
import wapp from '../../imagenes/wapp.png'
import '../styles/footer.css'


const Footer= () =>{
    return(
      <footer className="text-center text-white py-1">
          <div>© 2023 Hecho por el Grupo 2 &nbsp;<img src={inst} alt="" width="25" height="25"/> &nbsp;
          <img src={wapp} alt="" width="25" height="25"/></div>
      </footer>
    )
}

export default Footer