//Module pour recuperer un pokemon en fonction de son ID
//Pokemon es un modele sequilize
const { Pokemon } = require("../db/sequelize");
const pokemon = require("../models/pokemon");
const auth = require("../auth/auth");
module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        const message = `Le pokemon ${pokemon.name} a ete trouve`;
        res.json({ message, pokemon });
      })
      .catch((error) => {
        const message = "le pokemon demander n'a pas ete trouver";
        console.error(error);
        res.json({ message, error });
      });
  });
};
