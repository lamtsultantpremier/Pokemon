const { ValidationError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const pokemon = require("../models/pokemon");
module.exports = (app) => {
  app.put("/api/pokemon/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          const message = `Le pokemon ${pokemon.name} a ete mise a jour`;
          res.json({ message, pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(404).json({ message: error.message, error });
        }
        res.status(400).json({ message: error.message, error });
      });
  });
};
