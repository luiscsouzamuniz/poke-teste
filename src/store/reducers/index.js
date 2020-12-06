import { combineReducers } from "redux";
import { pokemons } from './pokemons'
import { apollo } from './apollo'

export default combineReducers({ pokemons, apollo })