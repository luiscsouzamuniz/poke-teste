import { gql } from "@apollo/client"
import { Button, Container, Sprite, Progress, List } from "nes-react"
import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setPokemons } from "../store/actions/pokemons"

const onePokemonQuery = gql`
query Pokemon($id: String) {
  pokemon (id: $id) {
    id
    name
    image
    types
    number
    resistant
    weaknesses
    classification
    maxHP
    maxCP
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    attacks {
      fast {
        name
      }
      special {
        name
      }
    }
  }
}
`

export class PokemonDetailsClass extends Component {
  state={
    loading: true,
  }

  componentDidMount = () => this.getOnePokemon()

  getOnePokemon = async () => {
    const { params, apollo } = this.props

    const {
      data: {
        pokemon,
      },
    } = await apollo.query({
      query: onePokemonQuery,
      variables: {
        id: params.id,
      },
    })

    this.props.setPokemons(pokemon)

    this.setState({
      loading: false,
    })

    return undefined
  }

  render() {
    const { loading } = this.state
    const { pokemons } = this.props

    if (loading) return (
      <div className="center-xs">
        <Sprite sprite="pokeball" />
        <span className="row center-xs">Carregando...</span>
      </div>
    )

    if (!pokemons) return (
      <div className="col-md-12">
        <Container dark rounded>
          <div className="nes-field is-inline">
            <p>Nenhum resultado encontrado.</p>
            <Link to="/"><Button>Voltar</Button></Link>
          </div>
        </Container>
      </div>
    )

    return (
      <Container title={`${pokemons.name} - Nº ${pokemons.number}`}>
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <img style={{ maxWidth: '100%' }} src={pokemons.image} alt={pokemons.name} />
          </div>
          <div className="col-md-8 col-xs-12">
            <Container rounded title="Detalhes">
              <List solid style={{ fontSize: '8pt' }}>
                <li>Categoria: {pokemons.classification}</li>
                <li>Tipo: {pokemons.types.join(', ')}</li>
                <li>Altura: {pokemons.height.minimum} - {pokemons.height.maximum}</li>
                <li>Peso: {pokemons.weight.minimum} - {pokemons.weight.maximum}</li>
                <li>
                  Ataques: 
                </li>
                <List>
                  <li>rápidos: {pokemons.attacks.fast.map(item => item.name).join(', ')}</li>
                  <li>especiais: {pokemons.attacks.special.map(item => item.name).join(', ')}</li>
                </List>
                <li>Forte contra: {pokemons.resistant.join(', ')}</li>
                <li>Fraco contra: {pokemons.weaknesses.join(', ')}</li>
                <br />
                <span>HP <Progress max={4500} value={pokemons.maxHP} /></span>
                <span>CP <Progress max={4500} value={pokemons.maxCP} /></span>
              </List>
            </Container>
          </div>
        </div>
        <div className="row col-xs-12">
          <Link to="/">
            <Button>Voltar</Button>
          </Link>
          <Link to={`/edit/${pokemons.id}`}>
            <Button primary style={{ marginLeft: '10px' }}>Editar</Button>
          </Link>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons.data,
  apollo: state.apollo,
})

const mapDispatchToProps = dispatch => ({
  setPokemons: (pokemons) => dispatch(setPokemons(pokemons)),
})

export const PokemonDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonDetailsClass)