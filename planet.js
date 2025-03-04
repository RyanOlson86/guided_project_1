let planetInfo;
let characters;
let films;
let nameH1;
const baseUrl = `http://localhost:9001/api`;

//Set up page load listener
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    const searchParams = new URLSearchParams(window.location.search)
    const planetId = searchParams.get('id')
    fetchPlanet(planetId);
    fetchCharacters(planetId);
    fetchFilms(planetId)
})

async function fetchPlanet(planetId) {
    try {
        const response = await fetch(`${baseUrl}/planets/${planetId}`);
        planetInfo = await response.json();
        renderPlanetInfo()
    } catch (error) {
        console.error('Error in fetchPlanet', error);
    }
}

async function fetchCharacters(planetId) {
    try {
        const response = await fetch(`${baseUrl}/planets/${planetId}/characters`);
        characters = await response.json();
        renderCharacters()
    } catch (error) {
        console.error('Error in fetchPlanet', error);
    }
}

async function fetchFilms(planetId) {
    try {
        const response = await fetch(`${baseUrl}/planets/${planetId}/films`);
        films = await response.json();
        console.log(films);
        renderFilms();
    } catch (error) {
        console.error('Error in fetchPlanet', error);
    }
}

function renderPlanetInfo() {
    nameH1.innerText = planetInfo.name
    document.querySelector('#climate').innerText = planetInfo.climate;
    document.querySelector('#gravity').innerText = planetInfo.gravity;
    document.querySelector('#terrain').innerText = planetInfo.terrain;
}

function renderCharacters() {
    let newHtml="";
    characters?.map(character => {
        newHtml += `<a href="/character.html?id=${character.id}">${character.name}</a>`
    })
    document.querySelector('div#character-div').innerHTML = newHtml;
}

function renderFilms(){
    let newHtml = "";
    films?.map(film => {
        newHtml += `<a href="/film.html?id=${film.id}">${film.title}</a>`
    })
    document.querySelector('div#films-div').innerHTML = newHtml;
}