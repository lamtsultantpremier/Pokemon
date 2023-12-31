const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const app = express();
let localhost = "localhost";
const port = process.env.PORT || 3000;
app.use(bodyParser.json()).use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello Render");
});
sequelize.initDB();
//find All the Pokemon
require("./src/routes/findAllpokemons")(app);
//find One pokemon by her Id
require("./src/routes/findOnePokemonBYId")(app);
// Add pokemon in the database
require("./src/routes/createPokemon")(app);
// update Pokemon with her id
require("./src/routes/updatePokemon")(app);
// delete pokemon with her id
require("./src/routes/deletePokemon")(app);

//Exercice 4
// require("./src/routes/exercice4")(app);
//EndPoint for login
require("./src/routes/login")(app);
app.use((req, res) => {
  const message = "La ressource demander n'est pas disponible";
  res.status(404).json({ message });
});
app.listen(port, () => {
  console.log(
    `We are listening to the port ${port} at http://${localhost}:${port}`
  );
});
