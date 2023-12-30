exports.success = (message, data) => {
  return {
    message,
    data,
  };
};
exports.getUnique = (pokemons = []) => {
  const pokemonsId = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonsId.reduce((a, b) => Math.max(a, b));
  const uniqId = maxId + 1;
  return uniqId;
};
