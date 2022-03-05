import './App.css';
import Bat from './Components/Bat';
import Ball from './Components/Ball';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Bat />
        <Ball />
      </Provider>
    </div>
  );
}

export default App;
