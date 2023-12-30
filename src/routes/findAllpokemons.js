//Module pour recuperer tous les Pokemons
//Pokemon es un modele sequilize
const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      /**
       * The findAll can take two parameters
       * first:where clause{take the object contains the differents columns that is using}
       */
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["name"],
      })
        .then(({ count, rows }) => {
          const message = `votre requete contient ${count} resultat`;
          return res.json({ message, rows });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    //   return Pokemon.findAll({
    //     where: {
    //       name: {
    //         [Op.like]: `%${name}%`,
    //       },
    //     },
    //     limit: 2,
    //   })
    //     .then((pokemon) => {
    //       res.json({ pokemon });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });}
    else {
      const message = `All the pokemons in the database`;
      return Pokemon.findAll()
        .then((pokemons) => {
          res.json({ message, pokemons });
        })
        .catch((error) => {
          const message = `La liste des pokemon n'a pas pu etre recuperer Reessayer plus tard`;
          res.status(500).json({ message, error });
        });
    }
  });
};
