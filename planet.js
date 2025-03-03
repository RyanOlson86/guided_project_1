let planetInfo;

const baseUrl = `http://localhost:9001/api`;



async function getPlanet(planetId) {
    try {
        const response = await fetch(`${baseUrl}/planets/${planetId}`);
        planetInfo = await response.json()
    } catch(error){
        console.error('Error in getPlanet', error);
    }
}

// getPlanet(1)