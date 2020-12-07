export const incrementFirst = (first) => {
  return {
    type: 'INCREMENT_FIRST',
    first: first + 12,
  }
}

export const setPokemons = (pokemons) => {
  return {
    type: 'SET_POKEMONS',
    pokemons,
  }
}