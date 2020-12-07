import 'flexboxgrid/css/flexboxgrid.min.css'
import 'nes.css/css/nes.min.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Details, Header, PokemonGrid, PokemonEdit } from './components'
import { Provider } from "react-redux"
import store from "./store"
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={PokemonGrid} />
            <Route path="/details/:id" component={Details} />
            <Route path="/edit/:id" component={PokemonEdit} />
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
