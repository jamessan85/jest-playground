// Import the Express app that will be tested
const expressApp = require("./express");

// Import Supertest, a library for testing HTTP requests
const request = require("supertest");

// Import Axios, a library used for making HTTP requests
const axios = require("axios");

// Mock the axios module, so real HTTP requests are not made during tests
jest.mock("axios");

// Import the 'randomisePokemon' function
const randomisePokemon = require("./lib/randomisePokemon");

// Mock the 'randomisePokemon' function to control its return value during tests
jest.mock("./lib/randomisePokemon");

// Grouping tests for the GET request to the root path ("/")
describe("GET /", () => {

    // Test case 1: Check if a successful GET request returns a Pokémon with status 200
    it("Should return a pokemon", async () => {
        // Mock Axios to return a successful response with a Pokémon object
        axios.get.mockResolvedValueOnce({
            status: 200,
            data: {
                name: "bob",
                sprites: { front_default: "http://testimage" },
                weight: 200,
                height: 200
            }
        });

        // Make a GET request to the root ("/") endpoint using Supertest and expect a status code 200
        const response = await request(expressApp).get("/").expect(200);

        // Use snapshot testing to ensure that the returned response matches the expected structure
        expect(response.text).toMatchSnapshot();
    });

    // Test case 2: Check if an error scenario (status 500) is handled correctly
    it("Should return an error", async () => {
        // Mock Axios to return an error response with status 500
        axios.get.mockResolvedValueOnce({
            status: 500,
            data: {
                name: "bob",
                sprites: { front_default: "http://testimage" },
                weight: 200
            }
        });

        // Make a GET request to the root ("/") and expect a status code of 500
        const response = await request(expressApp).get("/").expect(500);

        // Ensure that the response matches the error scenario snapshot
        expect(response.text).toMatchSnapshot();
    });

    // Test case 3: Check if the 'randomisePokemon' function returns "donkey" and if it's reflected in the response
    it("Should return donkey", async () => {
        // Mock Axios to return a successful Pokémon response
        axios.get.mockResolvedValueOnce({
            status: 200,
            data: {
                name: "bob",
                sprites: { front_default: "http://testimage" },
                weight: 200,
                height: 200
            }
        });

        // Mock the 'randomisePokemon' function to return "donkey" for this test
        randomisePokemon.mockReturnValueOnce("donkey");

        // Make a GET request to the root ("/") endpoint, expecting a status code of 200
        const response = await request(expressApp).get("/").expect(200);

        // Check that the response text matches the expected structure using snapshot testing
        expect(response.text).toMatchSnapshot();

        // Ensure that the 'randomisePokemon' function returned "donkey" by checking its result
        expect(randomisePokemon.mock.results[2].value).toBe("donkey");
    });
});
