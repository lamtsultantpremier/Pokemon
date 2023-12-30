//Module d'ajout d'un Pokemon
//Pokemon es un modele sequilize
const { Pokemon } = require("../db/sequelize");
//traiter les erreurs de validations
const { ValidationError } = require("sequelize");
module.exports = (app) => {
  app.post("/api/pokemon", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokemon ${pokemon.name} a ete ajoute avec success`;
        return res.json({ message, pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = "Le pokemon n'a pâs pu etre ajouter";
        res.status(500).json({ message, error });
      });
  });
};
