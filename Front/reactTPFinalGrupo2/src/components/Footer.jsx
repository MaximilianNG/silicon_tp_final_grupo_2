import inst from '../../imagenes/inst.png'
import wapp from '../../imagenes/wapp.png'
import '../styles/footer.css'


const Footer= () =>{
    return(
        <footer className="text-center text-white" id="foo">
        <div className="container pt-4">

          <section className="mb-4">
            <a className="navbar-brand" href="">
              <img src={inst} alt="" width="45" height="45"/>
            </a>
            <a className="navbar-brand" href="#">
              <img src={wapp} alt="" width="45" height="45"/>
            </a>
          </section>
          
        </div>
        
      
        
        <div className="text-center text-white p-1" >
          © 2023 Copyright:
          <a className="text-white" href="">   Grupo 2</a>
        </div>
        
    </footer>

    )
}

export default Footer