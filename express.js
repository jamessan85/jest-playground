const express = require('express');
const app = express();
const nunjucks = require("nunjucks")
const { fetchPokemon } = require("./mocking")
const randomisePokemon = require("./lib/randomisePokemon")
const port = 3000;

app.set('view engine', 'njk');

nunjucks.configure(["./"], {
    autoescape: true,
    express: app,
});


app.get('/', async (req, res, next) => {
    const randomPokemon = randomisePokemon()
    console.log(randomPokemon)
    const pokemon = await fetchPokemon(randomPokemon)

    if (pokemon.status !== 200) {
        return next(new Error("Pokemon not found"))
    }
    res.render("pokemon", { pokemon: { ...pokemon.data } });
});

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app