// Import the 'setName' function from the 'setName.js' module.
const setName = require("./setName");

// Grouping the tests for the 'setName' function
describe("setName", () => {
    // Mock request object with an 'auth' property to simulate authentication
    const req = { auth: true };

    // Mock response object with 'locals' property that can store data (e.g., 'name')
    const res = {
        locals: { name: "" }, // Initially, 'name' is an empty string
    };

    // Mock 'next' function that will be used to proceed to the next middleware or signal an error
    const next = jest.fn(); // Jest's mock function to track whether it's called and with what arguments

    // Test case 1: Should correctly set 'res.locals.name' when authentication is valid (auth = true)
    it("Should set res.locals.name", () => {
        // Call the 'setName' function with the mocked request, response, and next function
        setName(req, res, next);

        // Expect 'res.locals.name' to be set to "Bob"
        expect(res.locals.name).toBe("Bob");

        // Expect the 'next' function to have been called to move to the next middleware
        expect(next).toHaveBeenCalled();
    });

    // Test case 2: Should return an error when authentication fails (auth = false)
    it("Should return error", () => {
        // Set 'auth' to false to simulate an unauthenticated request
        req.auth = false;

        // Call the 'setName' function again with the updated 'auth' value
        setName(req, res, next);

        // Expect the 'next' function to have been called with a new Error(403), signaling unauthorized access
        expect(next).toHaveBeenCalledWith(new Error(403));
    });
});
