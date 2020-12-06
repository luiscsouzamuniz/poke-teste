import { ApolloConsumer, gql } from "@apollo/client";
import { Component, useEffect, useState } from "react";
import { Button, Container, Sprite } from 'nes-react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin-top: 10px;
  font-size: 0.7rem;
`

const allPokemonsQuery = gql`
  query Pokemons($first: Int!) {
    pokemons (first: $first) {
      id
      name
      image
      types
    }
  }
`

const onePokemonQuery = gql`
  query Pokemon($name: String) {
    pokemon (name: $name) {
      id
      name
      image
      types
    }
  }
`

const PokemonsContainer = ({ query, variables, loadMore }) => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPokemons = async () => {
    const {
      data: {
        pokemons,
      },
    } = await query({
      query: allPokemonsQuery,
      variables,
    })

    setPokemons(pokemons)
    setLoading(false)
  }

  const getOnePokemon = async () => {
    const {
      data: {
        pokemon,
      },
    } = await query({
      query: onePokemonQuery,
      variables: {
        name,
      },
    })

    if (pokemon) setPokemons([pokemon])
  }

  const onChangeInput = ({ target: { value }}) => setName(value) 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllPokemons(), [])

  if (loading) return (
    <div className="center-xs">
      <Sprite sprite="pokeball" />
    </div>
  )

  return (
    <>
      <div className="nes-text row col-xs-12">
        <div className="nes-field is-inline">
          <input
            type="text"
            className="nes-input"
            onChange={onChangeInput}
          />
          <Button onClick={getOnePokemon} primary>Buscar</Button>
        </div>
      </div>
      <div className="row">
        {
          pokemons.map(pokemon => {
            const type = pokemon?.types?.map(type => type)
            return (
              <StyledDiv className="col-md-3 col-xs-6" key={pokemon.name}>
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
          })
        }
      </div>
      {
        pokemons.length < 2 ? null : (
          <StyledDiv className="center-xs">
            <Button onClick={loadMore}>Carregar mais...</Button>
          </StyledDiv>
        )
      }
    </>
  )
}

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