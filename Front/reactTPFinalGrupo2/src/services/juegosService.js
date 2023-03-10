const API = 'http://localhost:3302';

//CREATE de un juego.
export async function nuevoJuego(datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/juegos`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en nuevoJuego() de juegosServices.js: ");
        console.log(error);
    }
} 

//READ de todos los juegos.
export async function getJuegos() {
    const token = JSON.parse(localStorage.getItem('token'));
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${API}/juegos`, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error en getJuegos() de juegosServices.js: " + error);
    }
}

//UPDATE de un juego.
export async function editarJuego(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/juegos/${id}`, requestOptions);
    const data = await response.json();
    return data;
}  

//DELETE lógico de un juego.
export async function estadoJuego(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/estadojuegos/${id}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(error) {
        alert("Hubo un error en estadoJuego() de juegosService.js");
    }
}