import { PokemonDetails } from "./PokemonDetails"
export const Details = ({ match: { params }}) => (
  <div className="col-xs-12">
    <PokemonDetails params={params} />
  </div>
)