const API = 'http://localhost:3302';

//CREATE de un equipo.
export async function nuevoEquipo(datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/equipos`, requestOptions);
    const data = await response.json();
    return data;
} 

//READ de todos los equipos.
export async function getEquipos() {
    try {
        const response = await fetch(`${API}/equipos`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error en getEquipos() de equiposService.js: " + error);
    }
}


//UPDATE de un equipo.
export async function editarEquipo(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/equipos/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error en equiposService.js");
    }
}  

//DELETE lógico de un equipo.
export async function estadoEquipo(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/estadoequipos/${id}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(error) {
        alert("Hubo un error en estadoEquipo() de equiposService.js");
    }
}