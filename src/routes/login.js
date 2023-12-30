const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
//Ajout du jeton JWT
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "Le user n'existe pas";
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((passwordExist) => {
            if (!passwordExist) {
              const message = "le password entrer est invalide";
              return res.status(401).json({ message });
            }
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });
            const message = `l'utilisateur ${user.username} existe dans notre Base de donnee`;
            res.json({ message, user, token });
          });
      })
      .catch((error) => console.error({ message, data: error }));
  });
};
