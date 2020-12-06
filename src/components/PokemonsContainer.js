
import { Component } from "react";
import { Button, Container, Sprite } from 'nes-react'
import { gql } from "@apollo/client"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { incrementFirst } from "../store/actions/pokemons";

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

class PokemonsContainerClass extends Component {
  state = {
    pokemons: [],
    loading: true,
    name: '',
  }

  componentDidMount = () => this.getAllPokemons()

  componentDidUpdate = (prevProps) => {
    const { first } = this.props

    if (prevProps.first !== first) this.getAllPokemons()
  }

  getAllPokemons = async () => {
    const { first } = this.props
    const {
      data: {
        pokemons,
      },
    } = await this.props.apollo.query({
      query: allPokemonsQuery,
      variables: {
        first,
      },
    })

    if (pokemons) {
      this.setState({
        pokemons,
        loading: false,
      })
    }
  }

  getOnePokemon = async () => {
    const { name } = this.state

    if (!name) return undefined

    const {
      data: {
        pokemon,
      },
    } = await this.props.apollo.query({
      query: onePokemonQuery,
      variables: {
        name,
      },
    })

    if (pokemon) {
      this.setState({
        pokemons: [pokemon],
      })

      return undefined
    }

    this.setState({
      pokemons: [],
    })
    return undefined
  }

  onChangeInput = ({ target: { value: name }}) => this.setState({ name }) 

  render() {
    const { loading, name, pokemons } = this.state

    const { first } = this.props

    if (loading) return (
      <div className="center-xs">
        <Sprite sprite="pokeball" />
        <span className="row center-xs">Carregando...</span>
      </div>
    )
    
    return (
      <>
        <div className="nes-text row col-xs-12">
          <div className="nes-field is-inline">
            <input
              type="text"
              className="nes-input"
              onChange={this.onChangeInput}
              value={name}
            />
            <Button
              onClick={this.getOnePokemon}
              primary
              disabled={!name}
            >
              Buscar
            </Button>
          </div>
        </div>
        <div className="row">
          {
            pokemons.length === 0 ? (
              <div className="col-md-12">
                <Container dark rounded>
                  <div className="nes-field is-inline">
                    <p>Nenhum resultado encontrado.</p>
                    <Button onClick={this.getAllPokemons}>Voltar</Button>
                  </div>
                </Container>
              </div>
            ) : pokemons.map(pokemon => (
              <StyledDiv className="col-md-3 col-xs-6" key={pokemon.name}>
                <Container key={pokemon.id} title={pokemon.name}>
                  <div className="center-xs">
                    <img
                      className="nes-avatar is-large"
                      alt={pokemon.name}
                      src={pokemon.image}
                    />
                  </div>
                  <div className="center-xs">
                    <span>Tipo: {pokemon.types.join(', ')}</span>
                  </div>
                  <div className="center-xs">
                    <Link to={`/details/${pokemon.id}`}>
                      <Button type="button">Detalhes</Button>
                    </Link>
                  </div>
                </Container>
              </StyledDiv>
            ))
          }
        </div>
        {
          pokemons.length < 2 ? null : (
            <StyledDiv className="center-xs">
              <Button
                onClick={() => this.props.incrementFirst(first)}
              >Carregar mais...</Button>
            </StyledDiv>
          )
        }
      </>
    )
  }

}

const mapStateToProps = state => ({
  pokemons: state.pokemons.data,
  apollo: state.apollo,
  first: state.pokemons.first,
})

const mapDispatchToProps = dispatch => ({
  incrementFirst: (first) => dispatch(incrementFirst(first)),
})

export const PokemonsContainer = connect(mapStateToProps, mapDispatchToProps)(PokemonsContainerClass)