import { ApolloConsumer } from "@apollo/client";
import { Component } from "react"
import { PokemonsContainer } from "./PokemonsContainer";
export class PokemonGrid extends Component {
  state = {
    first: 12,
  }

  loadMore = () => {
    this.setState(prevState => ({
      first: prevState.first + 12,
    }))
  }

  render() {
    const { first } = this.state

    return (
      <ApolloConsumer>
        {({ query }) => (
          <div className="col-xs-12">
            <PokemonsContainer query={query} variables={{ first }} loadMore={this.loadMore} />
          </div>
        )}
      </ApolloConsumer>
    )
  }
}