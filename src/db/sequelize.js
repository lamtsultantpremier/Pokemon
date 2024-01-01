//Ce fichier contient les instructions pour Interaction avec la Base de Donnee
const { Sequelize, DataTypes } = require("sequelize");
const pokemons = require("./mock-pokemon.js");
const bcrypt = require("bcrypt");
//Connexion a la base de donnee
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_NAME,
    dialect: "mariadb",
    logging: false,
    port: process.env.DB_PORT || 3306,
  }
);
//Instanciation des differents Models
const PokemonModel = require("../models/pokemon.js");
const UserModel = require("../models/user.js");
//connexion a la base de donnee avec Sequilize
//Creation d'une instance de Sequilize
const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const initDB = () => {
  return sequelize.sync({ force: true }).then((pokemon) => {
    pokemons.forEach((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        types: pokemon.types,
      })
        .then((pokemon) => console.log(pokemon.toJSON()))
        .catch((error) => console.error(error));
    });
    bcrypt.hash("123@", 10).then((hash) => {
      User.create({
        username: "lamine",
        password: hash,
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
};
module.exports = {
  initDB,
  Pokemon,
  User,
};
