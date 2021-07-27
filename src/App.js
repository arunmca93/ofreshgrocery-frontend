import './App.css';
//import logo_jpg from './assets/images/logo.jpg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Importing Components
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <Router basename='/app'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
