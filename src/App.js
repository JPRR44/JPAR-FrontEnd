import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  HomePage  from './containers/home/home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='content'>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
