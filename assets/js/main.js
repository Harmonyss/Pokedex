const pokemonList = document.getElementById(`pokemonList`)
const loadMaisButton = document.getElementById(`mais`)
const limit = 12
let offset = 0


function loadPokeItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newhtml = pokemons.map((pokemon) =>  `
            <li class="pokemon ${pokemon.typesMain}">
                <span class="number">00${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((typesMain) => `<li class="type ${typesMain}">${typesMain}</li>`).join("")}
                    </ol>         
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join("")
        pokemonList.innerHTML +=newhtml
    })
}

loadPokeItens(offset, limit)

loadMaisButton.addEventListener(`click`, () => {
    offset+=limit
    loadPokeItens(offset, limit)
})
