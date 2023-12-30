/**
 * Mettre en place une API REST
 */
const express = require("express");
let pokemons = require("./mock-pokemon");
const { success, getUnique } = require("./helper");
const app = express();
const port = 3000;
app.use(express.json());
app.get("/api/pokemons", (req, res) => {
  const message = `Listes des ${pokemons.length} Pokemons`;
  res.json(pokemons);
});
app.post("/api/pokemons", (req, res) => {
  const id = getUnique(pokemons);
  const pokemonAdded = { ...{ id, dateCreated: new Date() }, ...req.body };
  pokemons.push(pokemonAdded);
  res.json(pokemons);
});
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pokemonUpdate = { ...{ id, dateCreated: new Date() }, ...req.body };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id == id ? pokemonUpdate : pokemon;
  });
  const message = `le pokemon a ete mise a jour`;
  res.json(success(message, pokemons));
});
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDelete = pokemons.find((pokemon) => pokemon.id == id);
  pokemons = pokemons.filter((pokemon) => pokemon.id != id);
  const message = `le pokemon ${pokemonDelete.name} a ete supprime`;
  res.json(success(message, pokemons));
});
app.listen(port, () => {
  console.log(`We are listen to the port ${port} at http://localhost:${port}`);
});
