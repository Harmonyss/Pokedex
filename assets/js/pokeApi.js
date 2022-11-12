const pokeApi = {}

function convertPokeAPIDetailPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [typesMain] = types
    
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    
    pokemon.types = types
    pokemon.typesMain = typesMain

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeAPIDetailPokemon)
}



pokeApi.getPokemons = (offset = 0, limit = 130) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())// Sucesso
    .then((jsonBody) => jsonBody.results) // resposta do 1º then
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}

Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/1"),
    fetch("https://pokeapi.co/api/v2/pokemon/2"),
    fetch("https://pokeapi.co/api/v2/pokemon/3"),
    fetch("https://pokeapi.co/api/v2/pokemon/4")
]).then((results) => {

})