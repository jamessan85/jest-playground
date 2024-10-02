// Import the 'fetchPokemon' function from the 'mocking.js' module
const { fetchPokemon } = require("./mocking");

// Import the Axios library which will be mocked
const axios = require("axios");

// Mock Axios to prevent actual HTTP requests and control its behavior during the tests
jest.mock("axios");

// Grouping the tests for the 'fetchPokemon' function
describe("fetchPokemon", () => {
  // Declare a variable 'name' to represent the name of the Pokémon being fetched
  let name = "frank";

  // Test case 1: Should return the correct Pokémon response when the API call succeeds
  it("Should return response", async () => {
    // Mock Axios to return a successful response with a Pokémon named "frank"
    axios.get.mockResolvedValue({ status: 200, data: { name: "frank" } });

    // Call the 'fetchPokemon' function with the name 'frank' and expect the response to match a snapshot
    expect(await fetchPokemon(name)).toMatchInlineSnapshot(`
      {
        "data": {
          "name": "frank",
        },
        "status": 200,
      }
    `);

    // Verify that Axios was called with the correct URL (for Pokémon 'frank')
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/frank"
    );
  });

  // Test case 2: Should throw an error when the API call fails
  it("Should throw", async () => {
    // Mock Axios to return a rejected promise (an error)
    axios.get.mockRejectedValue(new Error("Cannot find pokemon help"));

    // Test that the 'fetchPokemon' function throws the correct error when it fails
    expect(async () => {
      await fetchPokemon(name);
    }).rejects.toThrow(new Error("Cannot find pokemon help"));

    // Ensure that Axios was called with the correct URL, even when the request failed
    expect(axios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/frank");
  });
});
