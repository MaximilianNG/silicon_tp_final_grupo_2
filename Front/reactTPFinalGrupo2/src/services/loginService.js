const API = 'http://localhost:3302';

//POST del login
export async function login(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API}/login`, requestOptions)
    const data = await response.json();
    return data;
    } catch(e){
        console.log("Error en login de loginService.js.");
        console.log(e);
    }
}