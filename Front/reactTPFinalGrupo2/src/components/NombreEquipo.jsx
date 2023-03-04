export function NombreEquipo(props) {
    const equipo = props.equipos.find((e) => {
        return e.id == props.id
    })

    let textito = "";
    if (props.posicion == "1") {
        textito = "Primero puesto: "
    } else if (props.posicion == "2") {
        textito = "Segundo puesto: "
    } else {
        textito = "Tercer puesto: "
    }

   if (props.equipos.length != 0) {
    return (
        textito + equipo.nombre
      )
   } else {
       return (
           "Hubo un error adquiriendo los equipos."
       )
   }
}