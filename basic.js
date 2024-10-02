const { call } = require("./express")

function name(name) {
    return "Your name is " + name
}

function add(a, b) {
    return a + b
}

function person(data) {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.firstName,
        fullName: `${data.firstName} ${data.middleName} ${data.lastName}`,
        age: data.age
    }
}


module.exports = { name, add, person }