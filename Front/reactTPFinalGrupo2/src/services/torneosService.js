const API = 'http://localhost:3302';

//CREATE de un torneo.
export async function nuevoTorneo(datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/torneos`, requestOptions);
    const data = await response.json();
    return data;
} 

//READ de todos los torneos.
export async function getTorneos() {
    try {
        const response = await fetch(`${API}/torneos`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error en getTorneos() de torneosService.js: " + error);
    }
}


//UPDATE de un equipo.
export async function editarTorneo(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/torneos/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error en  edtiarTorneo.js de torneosService.js");
    }
}  

//DELETE lógico de un torneo.
export async function estadoTorneo(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/estadotorneos/${id}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(error) {
        alert("Hubo un error en estadoTorneo() de torneosService.js");
    }
}