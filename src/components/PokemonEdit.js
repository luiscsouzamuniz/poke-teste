import { gql } from "@apollo/client"
import { Button, Container, Sprite } from "nes-react"
import { Component } from "react"
import { Form } from "react-final-form"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setPokemons } from "../store/actions/pokemons"
import { TextFields } from "./TextFields"

const Name = () => (
  <TextFields required name="name" label="Nome" />
)

const Classification = () => (
  <TextFields required name="classification" label="Categoria" />
)

const MaxHeight = () => (
  <TextFields required name="height.maximum" label="Max" />
)

const MinHeight = () => (
  <TextFields required name="height.minimum" label="Min" />
)

const MaxWeight = () => (
  <TextFields required name="weight.maximum" label="Max" />
)

const MinWeight = () => (
  <TextFields required name="weight.minimum" label="Min" />
)

const MaxHP = () => (
  <TextFields required name="maxHP" label="Max HP" />
)

const MaxCP = () => (
  <TextFields required name="maxCP" label="Max CP" />
)

const onePokemonQuery = gql`
query Pokemon($id: String) {
  pokemon (id: $id) {
    id
    name
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
  }
}
`

export class PokemonEditClass extends Component {
  state={
    loading: true,
  }

  componentDidMount = () => this.getOnePokemon()

  getOnePokemon = async () => {
    const { match: { params }, apollo } = this.props

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

  onSubmit = (attributes) => {
    localStorage.setItem('pokemonSaved', JSON.stringify(attributes));
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
      <div className="col-xs-12">
        <Form
          onSubmit={this.onSubmit}
          initialValues={pokemons} 
          render={({ handleSubmit, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Container>
                <div className="row">
                  <div className="col-xs-12">
                    <Name />
                    <Classification />
                    <label>Altura: </label>
                    <div className="nes-field is-inline">
                      <MinHeight />
                      <MaxHeight />
                    </div>
                    <label>Peso: </label>
                    <div className="nes-field is-inline">
                      <MinWeight />
                      <MaxWeight />
                    </div>
                    <MaxHP />
                    <MaxCP />
                  </div>
                </div>
                <div className="row col-xs-12" style={{ marginTop: '10px' }}>
                  <Link to={`/details/${pokemons.id}`}>
                    <Button>Voltar</Button>
                  </Link>
                  <Button disabled={pristine} success style={{ marginLeft: '10px' }}>Salvar</Button>
                </div>
              </Container>
            </form>
          )}
        />
      </div>
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

export const PokemonEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonEditClass)