import 'flexboxgrid/css/flexboxgrid.min.css'
import 'nes.css/css/nes.min.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ApiProvider, Details, Header, PokemonGrid } from './components'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={PokemonGrid} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
