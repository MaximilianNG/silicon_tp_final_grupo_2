const API = 'http://localhost:3300';

export async function getDepartamentos() {
    try {
        const response = await fetch(`${API}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error en services.js: " + error);
    }
}