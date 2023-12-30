//Module pour recuperer tous les Pokemons
//Pokemon es un modele sequilize
const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      if (name.length < 2) {
        const message = "Le nom doit contenir au moins 2 caractere";
        res.status(404).json({ message });
      }
      const limit = parseInt(req.query.limit) || 5;
      Pokemon.findAndCountAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
        limit: limit,
      })
        .then(({ count, rows }) => {
          const message = `Nous avons pu recuperer ${count} Pokemon`;
          res.json({ message, rows });
        })
        .catch((error) => console.error({ msg: error.message, error }));
    } else {
      return Pokemon.findAll()
        .then((pokemon) => {
          const message = "Liste de tous les Pokemons";
          return res.json({ message, pokemon });
        })
        .catch();
    }
  });
};
