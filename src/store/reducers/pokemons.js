const INITIAL_STATE = {
  data: [],
  first: 12,
}

export const pokemons = (state = INITIAL_STATE, action) => {
  if (action.type === 'INCREMENT_FIRST') {
    return {
      ...state,
      first: action.first,
    }
  }

  if (action.type === 'SET_POKEMONS') {
    return {
      ...state,
      data: action.pokemons,
    }
  }
  return state
}