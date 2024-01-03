import Clock from './Clock';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Clock />
      </Provider>
    </div>
  );
}

export default App;
