function randomisePokemon() {
    const pokemons = ["ditto", "pikachu", "bulbasaur"]
    return pokemons[Math.floor(Math.random() * pokemons.length)]
}

module.exports = randomisePokemon