import { gql } from "@apollo/client"
import { Button, Container, Sprite, Progress, List } from "nes-react"
import { Component } from "react"
import { Link } from "react-router-dom"

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

export class PokemonDetails extends Component {
  state={
    loading: true,
    pokemon: null,
  }

  componentDidMount = () => this.getOnePokemon()

  getOnePokemon = async () => {
    const { params } = this.props

    const {
      data: {
        pokemon,
      },
    } = await this.props.query({
      query: onePokemonQuery,
      variables: {
        id: params.id,
      },
    })

    this.setState({
      pokemon,
      loading: false,
    })

    return undefined
  }

  render() {
    const { loading, pokemon } = this.state

    if (loading) return (
      <div className="center-xs">
        <Sprite sprite="pokeball" />
        <span className="row center-xs">Carregando...</span>
      </div>
    )

    if (!pokemon) return (
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
      <div className="col-xs-12">
        <Container title={`${pokemon.name} - Nº ${pokemon.number}`}>
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className="col-md-8 col-xs-12">
              <Container rounded title="Detalhes">
                <List solid>
                  <li>Categoria: {pokemon.classification}</li>
                  <li>Tipo: {pokemon.types.join(', ')}</li>
                  <li>Altura: {pokemon.height.minimum} - {pokemon.height.maximum}</li>
                  <li>Peso: {pokemon.weight.minimum} - {pokemon.weight.maximum}</li>
                  <li>
                    Ataques: 
                  </li>
                  <List>
                    <li>rápidos: {pokemon.attacks.fast.map(item => item.name).join(', ')}</li>
                    <li>especiais: {pokemon.attacks.special.map(item => item.name).join(', ')}</li>
                  </List>
                  <li>Forte contra: {pokemon.resistant.join(', ')}</li>
                  <li>Fraco contra: {pokemon.weaknesses.join(', ')}</li>
                  <br />
                  <span>HP <Progress max={4500} value={pokemon.maxHP} /></span>
                  <span>CP <Progress max={4500} value={pokemon.maxCP} /></span>
                </List>
              </Container>
            </div>
          </div>
          <div className="row col-xs-12">
            <Link to="/">
              <Button>Voltar</Button>
            </Link>
            <Link to={`/edit/${pokemon.id}`}>
              <Button primary style={{ marginLeft: '10px' }}>Editar</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }
}