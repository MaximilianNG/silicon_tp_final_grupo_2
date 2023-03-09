const API = 'http://localhost:3302';


//READ de todos los jugadores.
export async function getJugadores() {
    try {
        const response = await fetch(`${API}/jugadores`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error en getJugadores() de jugadoresService.js: " + error);
    }
}

//CREATE de un jugador.
export async function nuevoJugador(datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/jugadores`, requestOptions);
    const data = await response.json();
    return data;

}


//DELETE lógico de un jugador.
export async function estadoJugador(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/estadojugador/${id}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(error) {
        alert("Hubo un error en estadoJugador() de jugadoresService.js");
    }
}


//UPDATE de un jugador.
export async function editarJugador(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/jugadores/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error en  edtiarJugador.js de JugadoresService.js");
    }
} 