import './App.css';
//import logo_jpg from './assets/images/logo.jpg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { persistor, store } from './Store/Persistor';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

//PrivateRoute
import PrivateRoute from './Utils/PrivateRoute';

//Importing Components
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import List from './Components/List';
import CreateList from './Components/CreateList';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <Router basename='/app'>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} permission='can_view_dashboard'  />
              <PrivateRoute exact path='/list' component={List} permission='can_view_list'  />
              <PrivateRoute exact path='/createList' component={CreateList} permission='can_create_list'  />

            </Switch>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
