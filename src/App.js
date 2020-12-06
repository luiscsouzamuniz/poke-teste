import { ApiProvider, Header } from './components'
import 'flexboxgrid/css/flexboxgrid.min.css'
import 'nes.css/css/nes.min.css'

function App() {
  return (
    <ApiProvider>
      <Header />
    </ApiProvider>
  );
}

export default App;
