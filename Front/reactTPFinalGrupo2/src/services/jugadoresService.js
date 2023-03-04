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


