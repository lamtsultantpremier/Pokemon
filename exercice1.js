/**
 * mettre en mplace un endpoint rentournant le nombre total de Pokemon
 * Guide
 * HTTp:GET
 * URL:/apoi/pokemon
 * reponse:il ya x pokemon da,s le pokedexe pour le moment
 *
 */
const express = require("express");
const pokemon = require("./mock-pokemon");
let app = express();
const port = 3000;
app.get("/api/pokemon", (req, res) => {
  let nbrePokemon = pokemon.length;
  res.send(`Vous avez ${nbrePokemon} pokemon dans votre Pokedexe`);
});
app.listen(port, () => {
  console.log(`We are listen to the port ${port} at http://localhost:${port}`);
});
