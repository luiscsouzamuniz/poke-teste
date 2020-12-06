import { ApolloConsumer } from "@apollo/client"
import { PokemonDetails } from "./PokemonDetails"
export const Details = ({ match: { params }}) => (
  <ApolloConsumer>
    {({ query }) => (
      <div className="col-xs-12">
        <PokemonDetails query={query} params={params} />
      </div>
    )}
  </ApolloConsumer>
)