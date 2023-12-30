module.exports = (sequelize, Datatypes) => {
  return sequelize.define("User", {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Datatypes.STRING,
      //contrainte d'unicite
      unique: {
        msg: "Le nom d'utilisateur doit etre unique",
      },
    },
    password: {
      type: Datatypes.STRING,
    },
  });
};
