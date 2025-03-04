let nameH1;
let releaseno;
let directorname;
let episodeno;

const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#title');
    releaseno = document.querySelector('span#release');
    directorname = document.querySelector('span#director');
    episodeno = document.querySelector('span#episode');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilms(id)


});

async function getFilms(id) {
    let films;
    let characters;
    let planets;

    try {
        films = await fetchFilms(id)
        characters = await fetchCharacter(id)
        planets = await fetchPlanets(id)
        console.log(films);
        console.log(characters);
        console.log(planets);
    }
    catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderFilms(films, characters, planets);

}
async function fetchHomeworld(character) {
    const url = `${baseUrl}/films/${character?.homeworld}`;
    const planet = await fetch(url)
        .then(res => res.json())
    return planet;
}

async function fetchCharacter(id) {
    let characterUrl = `${baseUrl}/films/${id}/characters`;
    return await fetch(characterUrl)
        .then(res => res.json())

}

async function fetchFilms(id) {
    const url = `${baseUrl}/films/${id}`;
    const films = await fetch(url)
        .then(res => res.json())
    return films;
}

async function fetchPlanets(id) {
    const url = `${baseUrl}/films/${id}/planets`;
    const planets = await fetch(url)
        .then(res => res.json())
    return planets;
}

const renderFilms = (films, characters, planets) => {
    document.title = `SWAPI - ${films?.title}`;  // Just to make the browser tab say their name
    nameH1.textContent = films?.title;
    releaseno.textContent = films?.release_date;
    directorname.textContent = films?.director;
    episodeno.textContent = films?.episode_id;

    const charactersList = characters.map((char) => {
        return `<li><a href="/character.html?id=${char.id}">${char.name}></a></li>`
    })
    document.querySelector('#characterList').innerHTML = charactersList;

    const planetList = planets.map((planet) => {
        return `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`
    })

    document.querySelector('#planetList').innerHTML = planetList;


}