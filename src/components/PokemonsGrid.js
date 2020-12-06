import { ApolloConsumer, gql } from "@apollo/client";
import { Component, useEffect, useState } from "react";
import { Button, Container, Sprite } from 'nes-react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin-top: 10px;
  font-size: 0.7rem;
`

const pokemonsQuery = gql`
  query Pokemons($first: Int!) {
    pokemons (first: $first) {
      id
      name
      image
      types
    }
  }
`

const PokemonsContainer = ({ query, variables }) => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  const getPokemons = async () => {
    const {
      data: {
        pokemons,
      },
    } = await query({
      query: pokemonsQuery,
      variables,
    })

    setPokemons(pokemons)
    setLoading(false)
  }

  useEffect(() => getPokemons())

  if (loading) return (
    <div className="center-xs">
      <Sprite sprite="pokeball" />
    </div>
  )

  return (
    <div className="row">
      {pokemons.map(pokemon => {
          const type = pokemon.types.map(type => type)
          return (
            <StyledDiv className="col-md-4 col-xs-6">
              <Container key={pokemon.id} title={pokemon.name} rounded>
                <div className="center-xs">
                  <img
                    className="nes-avatar is-rounded is-large"
                    alt={pokemon.name}
                    src={pokemon.image}
                  />
                </div>
                <div className="center-xs">
                  <span>Tipo: {type.join(', ')}</span>
                </div>
                <div className="center-xs">
                  <Button type="button">Detalhes</Button>
                </div>
              </Container>
            </StyledDiv>
          )
        })}
    </div>
  )
}

export class PokemonGrid extends Component {
  render() {
    return (
      <ApolloConsumer>
        {({ query }) => (
          <div className="col-xs-12">
            <div className="nes-text row col-xs-12">
              <span>Buscar: </span>
            </div>
            <div className="">
              <PokemonsContainer query={query} variables={{ first: 15 }} />
            </div>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}