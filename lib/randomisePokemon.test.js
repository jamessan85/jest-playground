// Import the 'randomisePokemon' function from the module
const randomisePokemon = require("./randomisePokemon");

describe("randomisePokemon", () => {
    // Test that the function returns a valid Pokémon from the list
    it("Should return a Pokémon from the list", () => {
        const pokemons = ["ditto", "pikachu", "bulbasaur"];

        // Call the function
        const result = randomisePokemon();

        // Check if the result is one of the expected Pokémon
        expect(pokemons).toContain(result);
    })
})