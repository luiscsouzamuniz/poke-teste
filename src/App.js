import { ApiProvider, Header, PokemonGrid } from './components'
import 'flexboxgrid/css/flexboxgrid.min.css'
import 'nes.css/css/nes.min.css'

function App() {
  return (
    <ApiProvider>
      <Header />
      <PokemonGrid />
    </ApiProvider>
  );
}

export default App;
