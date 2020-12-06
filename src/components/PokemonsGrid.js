import { ApolloConsumer } from "@apollo/client"
import { PokemonsContainer } from "./PokemonsContainer"
export const PokemonGrid = () => (
  <ApolloConsumer>
    {({ query }) => (
      <div className="col-xs-12">
        <PokemonsContainer query={query} />
      </div>
    )}
  </ApolloConsumer>
)