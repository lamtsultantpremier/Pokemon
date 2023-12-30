/**
 * EXERCICE 2
 */
const express = require("express");
const pokemons = require("./mock-pokemon");
const { storePokemons } = require("./helper");
const app = express();
const port = 3000;
app.get("/api/pokemons", (req, res) => {
  const message = "Liste des pokemons contenus dans le pokedexe ";
  res.json(storePokemons(message, pokemons));
});
app.listen(port, () => {
  console.log(` We are listen to the port: ${port}`);
});
