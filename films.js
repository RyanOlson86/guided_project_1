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
    //let 
    try {
        films = await fetchFilms(id)
        characters = await fetchCharacter(id)
        //   character.homeworld = await fetchHomeworld(character)
        //   character.films = await fetchFilms(character)
        console.log(films);
        console.log(characters);
    }
    catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderFilms(films,characters);

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
// get films data
async function fetchFilms(id) {
    const url = `${baseUrl}/films/${id}`;
    const films = await fetch(url)
        .then(res => res.json())
    return films;
}

const renderFilms = (films, characters) => {
    document.title = `SWAPI - ${films?.title}`;  // Just to make the browser tab say their name
    nameH1.textContent = films?.title;
    releaseno.textContent = films?.release_date;
    directorname.textContent = films?.director;
    episodeno.textContent = films?.episode_id;
    //    // homeworldSpan.innerHTML = `<a href="/planet.html?id=${films?.homeworld.id}">${films?.homeworld.name}</a>`;
       // const filmsLis = films?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
        const charactersList = characters.map((char)=> {
          return `<li><a href="/character.html?id=${char.id}">${char.name}</a></li>`
        })
        document.querySelector('#characterList').innerHTML = charactersList;

    //     filmsUl.innerHTML = filmsLis.join("");
}