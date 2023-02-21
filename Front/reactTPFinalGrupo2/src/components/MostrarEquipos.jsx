import '../styles/mostrarEquipos.css';

export function MostrarEquipos() {
    return(
    <> 
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className="table">
                        <thead className='table-primary'>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Juegos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
{/*                             { blogs.map ( (blog) => (
                                <tr key={ blog.id}>
                                    <td> { blog.title } </td>
                                    <td> { blog.content} </td>
                                    <td>
                                        <Link to={`/editar/${equipo.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link> 
                                        <button onClick={ ()=>eliminarEquipo(equipo.id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>                    
                            )) } */}

                        </tbody>
                    </table>
                </div>
            </div> 
        </div>
    </>  
    ) 
}