const API = 'http://localhost:3302';

//CREATE de un sponsor.
export async function nuevoSponsor(datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/sponsors`, requestOptions);
    const data = await response.json();
    return data;
} 

//READ de todos los sponsors y lo que sponsorean.
export async function getSponsors() {
    try {
        const response = await fetch(`${API}/sponsors`);
        const data = await response.json();
        let sponsors = componerSponsors(data);
        return sponsors;
    }
    catch (error) {
        console.log("Error en getSponsors() de sponsorsService.js: ");
        console.log(error);
    }
}


//UPDATES de un sponsor -- NOMBRE
export async function editarSponsorNombre(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/sponsorsNombre/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error en  edtiarSponsorsNombre.js de sponsorsService.js");
    }
}

//UPDATE de un sponsor -- AGREGAR EQUIPO
export async function nuevoEquipoSponsoreado(id, datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/equipos_sponsors/${id}`, requestOptions);
    const data = await response.json();
    return data;
} 

//UPDATE de un sponsor -- QUITAR EQUIPO
export async function quitarEquipoSponsoreado(id, datos) {
    const requestOptions={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/equipos_sponsors/${id}`, requestOptions);
    const data = await response.json();
    return data;
} 

//UPDATE de un sponsor -- AGREGAR TORNEO
export async function nuevoTorneoSponsoreado(id, datos) {
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/torneos_sponsors/${id}`, requestOptions);
    const data = await response.json();
    return data;
} 

//UPDATE de un sponsor -- QUITAR TORNEO
export async function quitarTorneoSponsoreado(id, datos) {
    const requestOptions={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    const response = await fetch(`${API}/torneos_sponsors/${id}`, requestOptions);
    const data = await response.json();
    return data;
} 

//DELETE lógico de un sponsor.
export async function estadoSponsor(id, datos) {
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try {
        const response = await fetch(`${API}/estadosponsors/${id}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(error) {
        alert("Hubo un error en estadoSponsor() de sponsorsService.js");
    }
}

// Utilities (?) - Re mala práctica esto de poner "utilities" y tirar un montón de código imperativo.
//Pero bueno, no hay mucho tiempo.


function Sponsor(id, nombre, estado) {
    this.id = id;
    this.nombre = nombre;
    this.estado = estado;
    this.equipos_sponsoreados = [];
    this.torneos_sponsoreados = []
}

const componerSponsors = (data) => {
    //Creo el array que voy a llenar con los sponsors finales.
    let sponsors = [];
    //Creo variable para controlar si estoy trabajando con un nuevo sponsor o no (en los datos).
    let uniqueId = 0;
    //Creo una flag para cuando paso de un sponsor al otro, así se empieza a componer uno nuevo.
    let nuevoSponsorFlag = false;
    //Creo el nuevo sponsor que voy a componer para pasárselo al array
    let nuevoSponsor = new Sponsor(0, "", 0);

    //Recorro los datos que llegaron
    for (const entry of data) {
        if (entry.id != uniqueId) {
            uniqueId += 1;
            nuevoSponsorFlag = true;
        }

        //Si se detectó un nuevo id, envío el sponsor hecho y reinicio la composición.
        if (nuevoSponsorFlag) {
            //Al comienzo siempre se va a detectar uno nuevo, así que no mando la primera vez.
            if (uniqueId != 1) {
                sponsors.push(nuevoSponsor);
            }
            //Reinicio el objeto.
            nuevoSponsor = new Sponsor(0, "", 0);
            //Apago esta flag.
            nuevoSponsorFlag = false;
        }

        //Acá compongo el nuevo sponsor
        if (nuevoSponsor.id == 0) {
            nuevoSponsor.id = entry.id;
        }
        if (nuevoSponsor.nombre == "") {
            nuevoSponsor.nombre = entry.nombre;
        }
        if (nuevoSponsor.estado == 0) {
            nuevoSponsor.estado = entry.estado
        }
        if (entry.equipo_sponsoreado != "-" && entry.equipo_sponsoreado != null) {
            nuevoSponsor.equipos_sponsoreados.push(entry.equipo_sponsoreado)
        }
        if (entry.torneo_sponsoreado != "-" && entry.torneo_sponsoreado != null) {
            nuevoSponsor.torneos_sponsoreados.push(entry.torneo_sponsoreado)
        }
    }
    //Pusheo el último antes de terminar, porque solo se pusheaban en la flag que para el último no se aplica. 
    sponsors.push(nuevoSponsor);
    return sponsors;
}