// Importing the functions 'name', 'add', and 'person' from the 'basic.js' module.
const { name, add, person } = require("./basic");


// Grouping the tests for the 'name' function
describe("name", () => {
    // Test case 1: Check if the 'name' function correctly formats the string for "bob"
    it("Should return your name is bob", () => {
        expect(name("bob")).toBe("Your name is bob");
    });

    // Test case 2: Check if the 'name' function correctly formats the string for "david"
    it("Should return your name is david", () => {
        expect(name("david")).toBe("Your name is david");
    });
});

// A separate 'test' function to check the output for "helen"
test("Expect name to be helen", () => {
    expect(name("helen")).toBe("Your name is helen");
});

// Data array containing sets of values to test the 'add' function
const data = [
    [1, 1, 2],   // Test case 1: 1 + 1 should equal 2
    [2, 1, 3],   // Test case 2: 2 + 1 should equal 3
    [4, 1, 5],   // Test case 3: 4 + 1 should equal 5
];

// Grouping the tests for the 'add' function
describe("add", () => {
    // Jest's it.each to loop through the test data and test the 'add' function for each set of inputs
    it.each(data)("add %s + %s = %s", (a, b, expected) => {
        expect(add(a, b)).toBe(expected); // Check if 'add(a, b)' equals 'expected'
    });

    // Using a plain JavaScript forEach loop to achieve the same thing as 'it.each'
    // This manually creates individual test cases from the 'data' array.
    data.forEach(([a, b, expected]) => {
        it(`Should add ${a} + ${b} and equal ${expected}`, () => {
            expect(add(a, b)).toBe(expected); // Again, check if 'add(a, b)' equals 'expected'
        });
    });
});

// Grouping the tests for the 'person' function
describe("person", () => {
    // Data representing a person object
    const data = {
        firstName: "James",
        lastName: "Doe",
        middleName: "Bob",
        age: 20,
    };

    // Test case: Check if the 'person' function correctly processes the input object
    // and matches the expected snapshot.
    // Snapshots help ensure the function output stays consistent over time.
    it("Should return an object", () => {
        expect(person(data)).toMatchInlineSnapshot(`
      {
        "age": 20,
        "firstName": "James",
        "fullName": "James Bob Doe",
        "lastName": "Doe",
        "middleName": "James",
      }
    `);
    });
});
