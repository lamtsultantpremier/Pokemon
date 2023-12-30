//Module de suppression d'un pokemon
//Pokemon es un modele sequilize
const { Pokemon } = require("../db/sequelize");
module.exports = (app) => {
  app.delete("/api/pokemon/delete/:id", (req, res) => {
    const id = req.params.id;
    let pokemonDeleted;
    return Pokemon.findByPk(id).then((pokemon) => {
      if (pokemon === null) {
        const message = `L'identifiant demander n'existe pas`;
        return res.status(404).json(message);
      }
      pokemonDeleted = pokemon;
    });
    Pokemon.destroy({
      where: { id: id },
    })
      .then((_) => {
        const message = `Pokemon ${pokemonDeleted.name} was deleted`;
        res.json({ message, pokemonDeleted });
      })
      .catch((error) => {
        const message = "L'identifiant n'existe pas ";
        res.status(404).json({ message, error });
      });
  });
};
