const axios = require("axios")

async function fetchPokemon(name) {
    try {
        const { data, status } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        return { data, status }
    } catch (error) {
        throw error
    }
}

module.exports = { fetchPokemon }