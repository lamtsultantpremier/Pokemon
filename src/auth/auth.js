//Mise en place d'une authentification via jwt
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.Authorization;
  if (!authorizationHeader) {
    const message =
      "you have not add the authorization token in your header request";
    return res.status(401).json({ message });
  }
  const token = authorizationHeader.split("")[1];
  const decodeToken = jwt.verify(token, privateKey, (error, decodeToken) => {
    if (error) {
      const message = "L'utilisateur ne peut pas acceder a cette ressource";
      return res.status(401).json({ message, error });
    }
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      const message = "L'identifiant de l'utilisateur est invalide";
      return res.status(401).json({ message });
    } else {
      next();
    }
  });
};
